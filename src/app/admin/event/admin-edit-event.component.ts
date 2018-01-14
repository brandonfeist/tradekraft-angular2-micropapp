import { StartEndDateValidation } from './../../validators/start-end-date-validation';
import { AppSettings } from 'app/app-settings';
import { ArtistService } from 'app/services/artist.service';
import { Event } from 'app/model/event';
import { EventService } from './../../services/event.service';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Artist } from 'app/model/artist';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';

@Component({
  templateUrl: './admin-edit-event.component.html'
})
export class AdminEditEventComponent implements OnInit {
  private eventEditForm: FormGroup;

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  private processing: boolean = false;

  private imageFile: File;

  private event: Event;

  private artists: Artist[];

  private eventSlug: string;

  private paramSubscription: any;

  private entryAges = ['all', '16+', '18+', '21+'];

  constructor(private eventService: EventService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private artistService: ArtistService) {}

  ngOnInit() {
    this.getArtists();
    
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.eventSlug = params['slug']);

    this.event = this.activatedRoute.snapshot.data['event'];

    this.createForm();
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private getArtists() {
    this.artistService.getArtists().subscribe((artists) => {
      this.artists = artists.content;
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("There was a problem getting artists.");
    })
  }

  private createForm() {
    this.eventEditForm = this.formBuilder.group({
      name: this.event.name,
      venueName: this.event.venueName,
      images: this.event.images,
      description: this.event.description,
      entryAge: this.event.entryAge,
      officialEvent: this.event.officialEvent,
      startDateTime: new Date(this.event.startDateTime),
      endDateTime: new Date(this.event.endDateTime),
      address: this.event.address,
      city: this.event.city,
      state: this.event.state,
      zip: this.event.zip,
      country: this.event.country,
      ticketLink: this.event.ticketLink,
      artists: [this.event.artists]
    }, {
      validator: StartEndDateValidation.dates('startDateTime', 'endDateTime')
    });
  }
  // Validate if startDateTime is less than endDateTime
  // Validate if ticketLink is a valid url

  compareFn(c1, c2): boolean {
    return c1.name && c2.name && c1.name === c2.name;
  }

  private keyupHandlerFunction(event) {
    this.eventEditForm.get('description').setValue(event);

    this.eventEditForm.controls.description.markAsDirty();
    this.eventEditForm.controls.description.markAsTouched();

    this.eventEditForm.markAsDirty();
    this.eventEditForm.markAsTouched();
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.eventEditForm.get('images').setValue(this.imageFile.name);
    }
  }
  

  removeImageFile() {
    this.imageFile = undefined;

    this.eventEditForm.get('images').setValue(this.event.name);
  }

  private getJsonPatches(): Object[] {
    let patches = [];

    for(let key in this.eventEditForm.controls) {
      if((this.eventEditForm.controls[key].touched || this.eventEditForm.controls[key].dirty)
        && key !== "images") {
        patches.push({op: "replace", path:"/" + key, value: this.eventEditForm.controls[key].value});
      }
    }

    return patches;
  }

  private onSubmit() {
    this.processing = true;

    let patches = this.getJsonPatches();

    if(this.eventEditForm.touched || this.eventEditForm.dirty || this.imageFile) {
      this.eventService.editEvent(this.event.slug, patches).subscribe((event) => {
            if(this.imageFile) {
              this.eventService.uploadEventImage(event.slug, this.imageFile).subscribe((eventWithImage) => {
                this.snackbarService.openSnackbar("Edited event " + event.name);
                this.router.navigate(['admin/events']);
              }, err => {
                console.log("err: ", err);
                this.snackbarService.openSnackbar("There was an error editing the event.");
    
                this.processing = false;
              })
            } else {
              this.snackbarService.openSnackbar("Edited event " + event.name);
              this.router.navigate(['admin/events']);
            }
          }, err => {
            console.log("err: ", err);
            this.snackbarService.openSnackbar("There was an error editing the event.");
    
            this.processing = false;
          })
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.event.name);
      this.router.navigate(['admin/events']);
    }
  }
}
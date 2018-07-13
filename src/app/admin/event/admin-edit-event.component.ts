import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
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

  private imageUploadProgress: number = 0;

  private imageFile;

  private event: Event;

  private artists: Artist[];

  private eventSlug: string;

  private paramSubscription: any;

  private entryAges = ['all', '16+', '18+', '21+'];

  constructor(private eventService: EventService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private artistService: ArtistService, private http: HttpClient) {}

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
      image: this.event.image,
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

    this.imageFile = this.event.image;
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
    this.removeImageFile();

    let fileList: FileList = event.target.files;

    this.http.request(this.eventService.uploadEventImage(fileList[0])).subscribe(imageResponse => {
      if(imageResponse.type === HttpEventType.UploadProgress) {
        this.imageUploadProgress = Math.round(100 * imageResponse.loaded / imageResponse.total);
      } else if (imageResponse instanceof HttpResponse) {
        this.eventEditForm.get('image').setValue(imageResponse.body);
        this.imageFile = imageResponse.body;
      }
    }, err => {
      console.log("image upload err: ", err);
      this.snackbarService.openSnackbar("There was an problem uploading the event image.");
    });
  }

  removeImageFile() {
    this.imageFile = undefined;

    this.eventEditForm.get('images').setValue(this.event.name);
  }

  private onSubmit() {
    this.processing = true;

    if(this.eventEditForm.touched) {
      this.eventService.updateEvent(this.event.slug, this.eventEditForm.value).subscribe(eventResponse => {
        this.snackbarService.openSnackbar("Edited event " + eventResponse.name);
        this.router.navigate(['admin/events']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("Event Edit Error: " + JSON.parse(err._body).error, undefined, 5000);

        this.processing = false;
      })
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.event.name);
      this.router.navigate(['admin/events']);
    }
  }
}
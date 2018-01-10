import { StartEndDateValidation } from './../../validators/start-end-date-validation';
import { AppSettings } from 'app/app-settings';
import { EventService } from './../../services/event.service';
import { RegexValidation } from './../../validators/regex-validation';
import { ArtistService } from 'app/services/artist.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { Artist } from 'app/model/artist';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';

@Component({
  templateUrl: './admin-create-event.component.html'
})
export class AdminCreateEventComponent implements OnInit {
  private eventCreateForm: FormGroup;

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  private processing: boolean = false;

  private artists: Artist[];

  private imageFile: File;

  private entryAges = ['all', '16+', '18+', '21+'];

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService,
    private eventService: EventService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.getArtists();

    this.createForm();
  }

  ngOnDestroy() {}

  private getArtists() {
    this.artistService.getArtists().subscribe((artists) => {
      this.artists = artists.content;
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("There was a problem getting artists.");
    })
  }

  private createForm() {
    this.eventCreateForm = this.formBuilder.group({
      name: null,
      venueName: null,
      images: null,
      description: null,
      entryAge: null,
      officialEvent: null,
      startDateTime: null,
      endDateTime: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      ticketLink: null,
      artists: null
    }, {
      validator: StartEndDateValidation.dates('startDateTime', 'endDateTime')
    });
  }
  // Validate if ticketLink is a valid url

  private keyupHandlerFunction(event) {
    this.eventCreateForm.get('description').setValue(event);
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.eventCreateForm.get('images').setValue(this.imageFile.name);
    }
  }

  removeImageFile() {
    this.imageFile = undefined;

    this.eventCreateForm.get('image').setValue(null);
  }

  private onSubmit() {
    this.processing = true;

    this.eventCreateForm.get('images').setValue(null);

    this.eventService.createEvent(this.eventCreateForm.value).subscribe(event => {
      this.eventService.uploadEventImage(event.slug, this.imageFile).subscribe(data => {
        this.snackbarService.openSnackbar("Created event " + event.name);
        this.router.navigate(['admin/events']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an problem uploading the event image.");
        
        this.processing = false;
      });
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("Event creation error.");
      // this.snackbarService.openSnackbar("Event Create Error: " + JSON.parse(err._body).error, undefined, 5000);

      this.processing = false;
    });
  }
}
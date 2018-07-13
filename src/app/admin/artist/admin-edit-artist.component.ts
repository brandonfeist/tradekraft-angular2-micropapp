import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app-settings';
import { YearService } from 'app/services/year.service';
import { Year } from 'app/model/year';
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
  templateUrl: './admin-edit-artist.component.html'
})
export class AdminEditArtistComponent implements OnInit {
  private artist: Artist; 

  private artistEditForm: FormGroup;

  private STARTING_YEAR: number = 2015;

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  private processing: boolean = false;

  private years = [];

  private imageUploadProgress: number = 0;

  private imageFile;

  private artistSlug: string;

  private paramSubscription: any;

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private yearService: YearService, private http: HttpClient) {}

  ngOnInit() {
    this.getYears();

    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.artistSlug = params['slug']);

    this.artist = this.activatedRoute.snapshot.data['artist'];

    this.createForm();
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private getYears() {
    let currentYear = moment().year();

    for(let yearIndex = this.STARTING_YEAR; yearIndex <= currentYear; yearIndex++) {
      this.years.push({year: yearIndex});
    }
  }

  private createForm() {
    this.artistEditForm = this.formBuilder.group({
      name: this.artist.name,
      image: this.artist.image,
      description: this.artist.description,
      soundcloud: [this.artist.soundcloud, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?soundcloud.com\/[^\/]+(\/)?$/)],
      facebook: [this.artist.facebook, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?facebook.com\/[^\/]+(\/)?$/)],
      twitter: [this.artist.twitter, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?twitter.com\/[^\/]+(\/)?$/)],
      instagram: [this.artist.instagram, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?instagram.com\/[^\/]+(\/)?$/)],
      spotify: [this.artist.spotify, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?open.spotify.com\/[^\/]+\/[^\/]+(\/)?$/)],
      yearsActive: [this.artist.yearsActive]
    });

    this.imageFile = this.artist.image;
  }

  private keyupHandlerFunction(event) {
    console.log(this.artistEditForm);
    this.artistEditForm.get('description').setValue(event);

    this.artistEditForm.controls.description.markAsDirty();
    this.artistEditForm.controls.description.markAsTouched();

    this.artistEditForm.markAsDirty();
    this.artistEditForm.markAsTouched();
  }

  private fileChange(event) {
    this.removeImageFile();

    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.http.request(this.artistService.uploadArtistImage(fileList[0])).subscribe(imageResponse => {
        if(imageResponse.type === HttpEventType.UploadProgress) {
          this.imageUploadProgress = Math.round(100 * imageResponse.loaded / imageResponse.total);
        } else if (imageResponse instanceof HttpResponse) {
          this.artistEditForm.get('image').setValue(imageResponse.body);
          this.imageFile = imageResponse.body;
        }
      }, err => {
        console.log("image upload err: ", err);
        this.snackbarService.openSnackbar("There was an problem uploading the artist image.");
      });
    }
  }

  removeImageFile() {
    this.imageFile = undefined;

    this.artistEditForm.get('image').setValue(null);
  }

  compareFn(c1, c2): boolean {
    return c1.year && c2.year && c1.year === c2.year;
  }

  private onSubmit() {
    this.processing = true;

    if(this.artistEditForm.touched) {
      this.artistService.editArtist(this.artist.slug, this.artistEditForm.value).subscribe(artistRes => {
        this.snackbarService.openSnackbar("Edited artist " + artistRes.name);
        this.router.navigate(['admin/artists']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("Artist Edit Error: " + JSON.parse(err._body).error, undefined, 5000);

        this.processing = false;
      });
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.artist.name);
      this.router.navigate(['admin/artists']);
    }
  }
}
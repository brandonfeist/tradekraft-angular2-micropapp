import { AppSettings } from 'app/app-settings';
import { Year } from 'app/model/year';
import { RegexValidation } from './../../validators/regex-validation';
import { ArtistService } from 'app/services/artist.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { Artist } from 'app/model/artist';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams, Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';
import { HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: './admin-create-artist.component.html'
})
export class AdminCreateArtistComponent implements OnInit {
  private artistCreateForm: FormGroup;

  private STARTING_YEAR: number = 2015;

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  private processing: boolean = false;

  private years: Year[] = [];

  private imageUploadProgress: number = 0;

  private imageFile;

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getYears();
    
    this.createForm();
  }

  ngOnDestroy() {}

  private getYears() {
    let currentYear = moment().year();

    for(let yearIndex = this.STARTING_YEAR; yearIndex <= currentYear; yearIndex++) {
      let year = new Year();
      year.year = yearIndex;

      this.years.push(year);
    }
  }

  private createForm() {
    this.artistCreateForm = this.formBuilder.group({
      name: null,
      image: null,
      description: null,
      soundcloud: [null, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?soundcloud.com\/[^\/]+(\/)?$/)],
      facebook: [null, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?facebook.com\/[^\/]+(\/)?$/)],
      twitter: [null, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?twitter.com\/[^\/]+(\/)?$/)],
      instagram: [null, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?instagram.com\/[^\/]+(\/)?$/)],
      spotify: [null, RegexValidation.regex(/^(http:\/\/|https:\/\/)(www.)?open.spotify.com\/[^\/]+\/[^\/]+(\/)?$/)],
      yearsActive: null
    });
  }

  private keyupHandlerFunction(event) {
    this.artistCreateForm.get('description').setValue(event);
  }

  private fileChange(event) {
    this.removeImageFile();

    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.http.request(this.artistService.uploadArtistImage(fileList[0])).subscribe(imageResponse => {
        if(imageResponse.type === HttpEventType.UploadProgress) {
          this.imageUploadProgress = Math.round(100 * imageResponse.loaded / imageResponse.total);
        } else if (imageResponse instanceof HttpResponse) {
          this.artistCreateForm.get('image').setValue(imageResponse.body);
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

    this.artistCreateForm.get('image').setValue(null);
  }

  private multiChange(event) {
    this.artistCreateForm.get('yearsActive').setValue(event.value);
  }

  private onSubmit() {
    this.processing = true;

    this.artistService.createArtist(this.artistCreateForm.value).subscribe(artistRes => {
      this.snackbarService.openSnackbar("Created artist " + artistRes.name);
      this.router.navigate(['admin/artists']);
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("Artist Create Error: " + JSON.parse(err._body).error, undefined, 5000);

      this.processing = false;
    });
  }
}
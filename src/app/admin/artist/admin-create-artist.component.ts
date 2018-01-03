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
  templateUrl: './admin-create-artist.component.html'
})
export class AdminCreateArtistComponent implements OnInit {
  private artistCreateForm: FormGroup;

  private STARTING_YEAR: number = 2015;

  private defaultImage: string = "assets/images/preload-image.jpg";

  private errorImage: string = "assets/images/error-image.jpg";

  private processing: boolean = false;

  private years: Year[] = [];

  private imageFile: File;

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router) {}

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
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.artistCreateForm.get('image').setValue(this.imageFile.name);
    }
  }

  private multiChange(event) {
    this.artistCreateForm.get('yearsActive').setValue(event.value);
  }

  private onSubmit() {
    this.processing = true;

    this.artistService.createArtist(this.artistCreateForm.value).subscribe(artist => {
      this.artistService.uploadArtistImage(artist.slug, this.imageFile).subscribe(data => {
        this.snackbarService.openSnackbar("Created artist " + artist.name);
        this.router.navigate(['admin/artists']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an problem uploading the artist image.");
        
        this.processing = true;
      });
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("Artist Create Error: " + JSON.parse(err._body).error, undefined, 5000);
    });
  }
}
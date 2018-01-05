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

  private defaultImage: string = "assets/images/preload-image.jpg";

  private errorImage: string = "assets/images/error-image.jpg";

  private processing: boolean = false;

  private years = [];

  private imageFile: File;

  private artistSlug: string;

  private paramSubscription: any;

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private yearService: YearService) {}

  ngOnInit() {
    this.getYears();

    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.artistSlug = params['slug']);

    this.artist = this.activatedRoute.snapshot.data['artist'];

    this.createForm();
  }

  ngOnDestroy() {}

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
  }

  private keyupHandlerFunction(event) {
    this.artistEditForm.get('description').setValue(event);

    this.artistEditForm.controls.description.markAsDirty();
    this.artistEditForm.controls.description.markAsTouched();

    this.artistEditForm.markAsDirty();
    this.artistEditForm.markAsTouched();
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.artistEditForm.get('image').setValue(this.imageFile.name);
    }
  }

  removeImageFile() {
    this.imageFile = undefined;

    this.artistEditForm.get('image').setValue(this.artist.name);
  }

  compareFn(c1, c2): boolean {
    return c1.year && c2.year && c1.year === c2.year;
  }

  private getJsonPatches(): Object[] {
    let patches = [];

    for(let key in this.artistEditForm.controls) {
      if(this.artistEditForm.controls[key].touched && key !== "image") {
        patches.push({op: "replace", path:"/" + key, value: this.artistEditForm.controls[key].value});
      }
    }

    return patches;
  }

  private onSubmit() {
    this.processing = true;

    let patches = this.getJsonPatches();

    if(this.artistEditForm.touched || this.imageFile) {
      this.artistService.editArtist(this.artist.slug, patches).subscribe((artist) => {
        if(this.imageFile) {
          this.artistService.uploadArtistImage(artist.slug, this.imageFile).subscribe((artistWithImage) => {
            this.snackbarService.openSnackbar("Edited artist " + artist.name);
            this.router.navigate(['admin/artists']);
          }, err => {
            console.log("err: ", err);
            this.snackbarService.openSnackbar("There was an error editing the artist.");

            this.processing = false;
          })
        } else {
          this.snackbarService.openSnackbar("Edited artist " + artist.name);
          this.router.navigate(['admin/artists']);
        }
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an error editing the artist.");

        this.processing = false;
      })
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.artist.name);
      this.router.navigate(['admin/artists']);
    }
  }
}
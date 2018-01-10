import { AuthService } from './../../services/auth.service';
import { AppSettings } from 'app/app-settings';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './admin-edit-user.component.html'
})
export class AdminEditUserComponent implements OnInit {

  private userEditForm: FormGroup;
  
  private processing: boolean = false;

  private imageFile: File;

  private user;

  private userSlug: string;

  private paramSubscription: any;

  constructor(private authService: AuthService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.userSlug = params['username']);

    this.user = this.activatedRoute.snapshot.data['user'];

    this.createForm();
  }

  ngOnDestroy() {}

  private createForm() {
    this.userEditForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      image: this.user.image,
      email: this.user.email,
      enabled: this.user.enabled
    });
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.userEditForm.get('image').setValue(this.imageFile.name);
    }
  }

  removeImageFile() {
    this.imageFile = undefined;

    this.userEditForm.get('image').setValue(this.user.image);
  }

  compareFn(c1, c2): boolean {
    return c1.year && c2.year && c1.year === c2.year;
  }

  private getJsonPatches(): Object[] {
    let patches = [];

    for(let key in this.userEditForm.controls) {
      if(this.userEditForm.controls[key].touched && key !== "image") {
        patches.push({op: "replace", path:"/" + key, value: this.userEditForm.controls[key].value});
      }
    }

    return patches;
  }

  private onSubmit() {
    // this.processing = true;

    // let patches = this.getJsonPatches();

    // if(this.artistEditForm.touched || this.imageFile) {
    //   this.artistService.editArtist(this.artist.slug, patches).subscribe((artist) => {
    //     if(this.imageFile) {
    //       this.artistService.uploadArtistImage(artist.slug, this.imageFile).subscribe((artistWithImage) => {
    //         this.snackbarService.openSnackbar("Edited artist " + artist.name);
    //         this.router.navigate(['admin/artists']);
    //       }, err => {
    //         console.log("err: ", err);
    //         this.snackbarService.openSnackbar("There was an error editing the artist.");

    //         this.processing = false;
    //       })
    //     } else {
    //       this.snackbarService.openSnackbar("Edited artist " + artist.name);
    //       this.router.navigate(['admin/artists']);
    //     }
    //   }, err => {
    //     console.log("err: ", err);
    //     this.snackbarService.openSnackbar("There was an error editing the artist.");

    //     this.processing = false;
    //   })
    // } else {
    //   this.snackbarService.openSnackbar("No edits made to " + this.artist.name);
    //   this.router.navigate(['admin/artists']);
    // }
  }
}
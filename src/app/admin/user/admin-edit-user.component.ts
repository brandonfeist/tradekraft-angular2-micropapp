import { AuthService } from './../../services/auth.service';
import { AppSettings } from 'app/app-settings';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  private roles = [];

  private userSlug: string;

  private paramSubscription: any;

  constructor(private authService: AuthService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.userSlug = params['username']);

    this.roles = this.activatedRoute.snapshot.data['roles'];

    this.user = this.activatedRoute.snapshot.data['user'];

    this.createForm();
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private createForm() {
    this.userEditForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      image: this.user.image,
      email: this.user.email,
      enabled: this.user.enabled,
      roles: [this.user.roles]
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
    return c1.name && c2.name && c1.name === c2.name;
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
    this.processing = true;

    let patches = this.getJsonPatches();

    if(this.userEditForm.touched || this.imageFile) {
      this.authService.editUser(this.user.username, patches).subscribe((user) => {
        // if(this.imageFile) {
        //   this.authService.uploadUserImage(user.username, this.imageFile).subscribe((userWithImage) => {
        //     this.snackbarService.openSnackbar("Edited user " + user.username);
        //     this.router.navigate(['admin/users']);
        //   }, err => {
        //     console.log("err: ", err);
        //     this.snackbarService.openSnackbar("There was an error editing the user.");

        //     this.processing = false;
        //   })
        // } else {
          this.snackbarService.openSnackbar("Edited user " + user.username);
          this.router.navigate(['admin/users']);
        // }
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an error editing the user.");

        this.processing = false;
      })
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.user.username);
      this.router.navigate(['admin/users']);
    }
  }
}
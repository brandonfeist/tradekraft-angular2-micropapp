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
  templateUrl: './admin-edit-role.component.html'
})
export class AdminEditRoleComponent implements OnInit {

  private roleEditForm: FormGroup;
  
  private processing: boolean = false;

  private role;

  private permissions = [];

  private roleName: string;

  private paramSubscription: any;

  constructor(private authService: AuthService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.roleName = params['name']);

    this.role = this.activatedRoute.snapshot.data['role'];

    this.permissions = this.activatedRoute.snapshot.data['permissions'];

    this.createForm();
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private createForm() {
    this.roleEditForm = this.formBuilder.group({
      name: this.role.name,
      permissions: [this.role.permissions]
    });
  }

  compareFn(c1, c2): boolean {
    return c1.name && c2.name && c1.name === c2.name;
  }

  private getJsonPatches(): Object[] {
    let patches = [];

    for(let key in this.roleEditForm.controls) {
      if(this.roleEditForm.controls[key].touched && key !== "image") {
        patches.push({op: "replace", path:"/" + key, value: this.roleEditForm.controls[key].value});
      }
    }

    return patches;
  }

  private onSubmit() {
    // this.processing = true;

    // let patches = this.getJsonPatches();

    // if(this.roleEditForm.touched) {
    //   this.authService.editUser(this.user.username, patches).subscribe((user) => {
    //     this.snackbarService.openSnackbar("Edited user " + user.username);
    //     this.router.navigate(['admin/users']);
    //   }, err => {
    //     console.log("err: ", err);
    //     this.snackbarService.openSnackbar("There was an error editing the user.");

    //     this.processing = false;
    //   })
    // } else {
    //   this.snackbarService.openSnackbar("No edits made to " + this.user.username);
    //   this.router.navigate(['admin/users']);
    // }
  }
}
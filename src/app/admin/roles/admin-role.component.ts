import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './admin-role.component.html'
})
export class AdminRoleComponent implements OnInit {

  private loading: boolean = true;

  private roles = [];

  private dataSource;

  private deleting = [];

  private displayedColumns = ['name', 'actions'];

  constructor(private authService: AuthService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getRoles();
  }

  ngOnDestroy() {}

  private getRoles() {
    this.authService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
      this.dataSource = new MatTableDataSource<Object>(this.roles);
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("Error getting roles.");
    })
  }

  private isDeletingRole(role) {
    for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
      if(this.deleting[deleteIndex].name === role.name) {
        return true;
      }
    }
  }

  private deleteRole(role) {
    this.deleting.push({ slug: role.name });

    // if(confirm("Are you sure you want to delete " + role.name + "?")) {
    //   this.authService.deleteUser(user.username).subscribe((data) => {
    //     for(let userIndex = 0; userIndex < this.users.length; userIndex++) {
    //       if(user.slug === this.users[userIndex].slug) {
    //         this.users.splice(userIndex, 1);
    //       }
    //     }

    //     this.dataSource = new MatTableDataSource<Object>(this.users);

    //     this.snackbarService.openSnackbar(user.username + " deleted.");
    //   }, err => {
    //     console.log("err: ", err);
    //     this.snackbarService.openSnackbar("There was a problem deleting " + user.username + ".");
    //   });
    // }
  }
}
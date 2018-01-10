import { AuthService } from 'app/services/auth.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {

  private loading: boolean = true;

  private users = [];

  private dataSource;

  private deleting = [];

  private displayedColumns = ['', 'username', 'actions'];

  constructor(private authService: AuthService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {}

  private getUsers() {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<Object>(this.users);
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("Error getting users.");
    })
  }

  private isDeletingUser(user) {
    for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
      if(this.deleting[deleteIndex].slug === user.slug) {
        return true;
      }
    }
  }

  private deleteUser(user) {
    this.deleting.push({ slug: user.slug });

    if(confirm("Are you sure you want to delete " + user.username + "?")) {
      this.authService.deleteUser(user.username).subscribe((data) => {
        for(let userIndex = 0; userIndex < this.users.length; userIndex++) {
          if(user.slug === this.users[userIndex].slug) {
            this.users.splice(userIndex, 1);
          }
        }

        this.dataSource = new MatTableDataSource<Object>(this.users);

        this.snackbarService.openSnackbar(user.username + " deleted.");
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem deleting " + user.username + ".");
      });
    }
  }
}
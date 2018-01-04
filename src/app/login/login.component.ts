import { Component, OnInit }      from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
    templateUrl: './login.component.html'
  })
  export class LoginComponent implements OnInit {

    private hide: boolean = true;
    private userLoginForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private router: Router, private snackbarService: SnackbarService) {}

    ngOnInit() {
      this.createLoginForm();
    }

    private createLoginForm() {
      this.userLoginForm = this.formBuilder.group({
        username: '',
        password: ''
      });
    }

    onSubmit() {
      let username = this.userLoginForm.get("username").value;
      let password = this.userLoginForm.get("password").value;

      this.authService.authenticate(username, password).subscribe(res => {
        this.router.navigate(['/']);
      }, err => {
        console.log("Error logging in: ", err);
        this.showLoginError(err);
      });
    }

    showLoginError(error) {
      let loginErrorMessage = JSON.parse(error._body).error_description;

      if(loginErrorMessage === "unauthorized") {
        this.snackbarService.openSnackbar("Sorry your username and password was incorrect. Please try again or contact support@tradekraftcollective.com",
          undefined, 5000);
      } else {
        this.snackbarService.openSnackbar("Login error: " + loginErrorMessage,
          undefined, 5000);
      }
    }
  }
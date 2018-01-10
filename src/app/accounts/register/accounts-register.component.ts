import { SnackbarService } from 'app/services/snackbar.service';
import { PasswordValidation } from './../../validators/password-validation';
import { Component, OnInit }      from '@angular/core';
import { FormArray, FormBuilder, FormGroup, EmailValidator, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './accounts-register.component.html'
  })
  export class AccountsRegisterComponent implements OnInit {
    
    private hide: boolean = true;
    private userRegistrationForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private router: Router, private snackbarService: SnackbarService) {}

    ngOnInit() {
      this.createRegistrationForm();
    }

    private createRegistrationForm() {
      this.userRegistrationForm = this.formBuilder.group({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        enabled: true,
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
      });
    }

    onSubmit() {
      let formUser = this.userRegistrationForm.value;
      delete formUser['confirmPassword'];

      this.authService.registerUser(formUser).subscribe((user) => {
        this.authService.authenticate(formUser.username, formUser.password).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log("Error logging in: ", err);
          this.snackbarService.openSnackbar("Account Created. Error logging in.");
        });
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("Error Registering");
      })
    }
  }
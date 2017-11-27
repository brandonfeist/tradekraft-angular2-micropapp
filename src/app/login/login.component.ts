import { Component, OnInit }      from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html'
  })
  export class LoginComponent implements OnInit {

    private hide: boolean = true;
    private userLoginForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private router: Router) {}

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
      });
    }
  }
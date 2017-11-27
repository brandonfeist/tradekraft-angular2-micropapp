import { Component, OnInit }      from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './accounts-reset.component.html'
  })
  export class AccountsResetComponent implements OnInit {
    
    private passwordResetForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private router: Router) {}

    ngOnInit() {
      this.createRegistrationForm();
    }

    private createRegistrationForm() {
      this.passwordResetForm = this.formBuilder.group({
        email: '',
      });
    }

    onSubmit() {

    }
  }
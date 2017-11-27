import { AccountsResetComponent } from './reset/accounts-reset.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LoginComponent } from 'app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsRoutingModule } from 'app/accounts/accounts-routing.module';
import { AccountsRegisterComponent } from 'app/accounts/register/accounts-register.component';

@NgModule({
    imports:  [ 
      CommonModule,
      AccountsRoutingModule,
      LazyLoadImageModule,
      CustomMaterialModule,
      ReactiveFormsModule
    ],
    declarations: [ 
      AccountsRegisterComponent,
      AccountsResetComponent
    ]
  })
  export class AccountsModule { }
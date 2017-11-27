import { CustomMaterialModule } from 'app/custom-material/custom-material.module';
import { LoginRoutingModule } from './login-routing.module';
import { SpotifyLoginComponent } from './spotify/spotify-login.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LoginComponent } from 'app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:  [ 
      CommonModule,
      LoginRoutingModule,
      LazyLoadImageModule,
      CustomMaterialModule,
      ReactiveFormsModule
    ],
    declarations: [ 
      LoginComponent,
      SpotifyLoginComponent
    ]
  })
  export class LoginModule { }
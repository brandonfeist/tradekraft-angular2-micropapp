import { LoginRoutingModule } from './login-routing.module';
import { SpotifyLoginComponent } from './spotify/spotify-login.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports:  [ 
      CommonModule,
      LoginRoutingModule,
      LazyLoadImageModule
    ],
    declarations: [ 
      SpotifyLoginComponent
    ]
  })
  export class LoginModule { }
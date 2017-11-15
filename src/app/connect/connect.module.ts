import { ConnectRoutingModule } from './connect-routing.module';
import { SpotifyConnectComponent } from './spotify/spotify-connect.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports:  [ 
      CommonModule,
      ConnectRoutingModule,
      LazyLoadImageModule
    ],
    declarations: [ 
      SpotifyConnectComponent
    ]
  })
  export class ConnectModule { }
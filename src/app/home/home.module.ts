import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { HomeComponent }     from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeVideoResolve } from 'app/home/home-video.resolve';


@NgModule({
    imports:      [
      CommonModule,
      HomeRoutingModule,
      SharedModule
    ],
    declarations: [ 
      HomeComponent
    ],
    providers: [
      HomeVideoResolve
    ]
  })
  export class HomeModule { }
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';

import { HomeComponent }     from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { EventPreviewComponent } from './../event/event-preview/event-preview.component';
import { EventService } from './../event/event.service';

@NgModule({
    imports:      [
      CommonModule,
      HomeRoutingModule
    ],
    declarations: [ 
      HomeComponent,
      EventPreviewComponent
    ],
    providers:    [ EventService ]
  })
  export class HomeModule { }
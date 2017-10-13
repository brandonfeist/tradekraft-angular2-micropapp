import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';

import { EventService }       from './event.service';
import { EventComponent }     from './event.component';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import { EventRoutingModule } from './event-routing.module';

@NgModule({
    imports:      [ 
      CommonModule,
      EventRoutingModule
    ],
    declarations: [ 
      EventComponent,
      EventPreviewComponent
    ],
    providers:    [ EventService ]
  })
  export class EventModule { }
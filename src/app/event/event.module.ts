import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventComponent }     from './event.component';
import { EventRoutingModule } from './event-routing.module';

@NgModule({
    imports:  [ 
      CommonModule,
      EventRoutingModule,
      LazyLoadImageModule
    ],
    declarations: [ 
      EventComponent
    ]
  })
  export class EventModule { }
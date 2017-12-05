import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventComponent }     from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { HighlightedEventResolve } from 'app/event/highlighted-event.resolve';

@NgModule({
    imports:  [ 
      CommonModule,
      EventRoutingModule,
      LazyLoadImageModule
    ],
    declarations: [ 
      EventComponent
    ],
    providers: [
      HighlightedEventResolve
    ]
  })
  export class EventModule { }
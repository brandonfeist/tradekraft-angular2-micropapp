import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventComponent }     from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { HighlightedEventResolve } from 'app/event/highlighted-event.resolve';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';

@NgModule({
    imports:  [ 
      CommonModule,
      EventRoutingModule,
      LazyLoadImageModule,
      CustomMaterialModule,
      ReactiveFormsModule,
      SharedModule
    ],
    declarations: [ 
      EventComponent
    ],
    providers: [
      HighlightedEventResolve
    ]
  })
  export class EventModule { }
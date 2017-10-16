import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import {RouterModule} from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventPreviewComponent } from './event-preview/event-preview.component';

@NgModule({
    imports:  [ 
      CommonModule,
      RouterModule,
      LazyLoadImageModule
    ],
    exports: [
        EventPreviewComponent
    ],
    declarations: [ 
      EventPreviewComponent
    ]
  })
  export class SharedModule { }
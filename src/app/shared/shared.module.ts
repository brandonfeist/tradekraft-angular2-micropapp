import { MusicTableComponent } from './music-table/music-table.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventPreviewComponent } from './event-preview/event-preview.component';
import { ReadMoreComponent } from './read-more/read-more.component';

@NgModule({
    imports:  [ 
      CommonModule,
      RouterModule,
      LazyLoadImageModule
    ],
    exports: [
      MusicTableComponent,
      EventPreviewComponent,
      ReadMoreComponent
    ],
    declarations: [ 
      MusicTableComponent,
      EventPreviewComponent,
      ReadMoreComponent
    ]
  })
  export class SharedModule { }
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';

import { ArtistService }       from './artist.service';
import { ArtistComponent }     from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';

@NgModule({
    imports:  [ 
      CommonModule,
      ArtistRoutingModule
    ],
    declarations: [ 
      ArtistComponent
    ]
  })
  export class ArtistModule { }
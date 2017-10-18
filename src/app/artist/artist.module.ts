import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtistComponent }  from './artist.component';
import { ArtistService }    from './artist.service';
import { ArtistRoutingModule }  from './artist-routing.module';

@NgModule({
    imports:  [ 
      CommonModule,
      ArtistRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule
    ],
    declarations: [ 
      ArtistComponent
    ],
    providers: [ ArtistService ]
  })
  export class ArtistModule { }
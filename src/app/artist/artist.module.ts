import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtistComponent }  from './artist.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistService }    from './artist.service';
import { ArtistRoutingModule }  from './artist-routing.module';
import { ArtistDetailsResolve } from './artist-details/artist-details.resolve';

@NgModule({
    imports:  [ 
      CommonModule,
      ArtistRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      SharedModule
    ],
    declarations: [ 
      ArtistComponent,
      ArtistDetailsComponent
    ],
    providers: [ 
      ArtistService, 
      ArtistDetailsResolve
    ]
  })
  export class ArtistModule { }
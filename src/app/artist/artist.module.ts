import { ArtistYearsResolve } from 'app/artist/artist-year.resolve';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
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
      CustomMaterialModule,
      SharedModule
    ],
    declarations: [ 
      ArtistComponent,
      ArtistDetailsComponent
    ],
    providers: [ 
      ArtistService, 
      ArtistDetailsResolve,
      ArtistYearsResolve
    ]
  })
  export class ArtistModule { }
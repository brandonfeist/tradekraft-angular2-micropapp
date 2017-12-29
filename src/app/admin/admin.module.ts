import { AdminDashboardComponent } from 'app/admin/admin.component';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from 'app/admin/admin-routing.module';
import { AdminArtistComponent } from 'app/admin/artist/admin-artist.component';
import { ArtistService } from 'app/artist/artist.service';

@NgModule({
    imports:  [ 
      CommonModule,
      AdminRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      CustomMaterialModule,
      SharedModule
    ],
    declarations: [ 
      AdminDashboardComponent,
      AdminArtistComponent
    ],
    providers: [
      ArtistService
    ]
  })
  export class AdminModule { }
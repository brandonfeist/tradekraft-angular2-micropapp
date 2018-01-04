import { AdminEditArtistResolve } from 'app/admin/artist/admin-edit-artist.resolve';
import { AdminCreateArtistComponent } from 'app/admin/artist/admin-create-artist.component';
import { AdminDashboardComponent } from 'app/admin/admin.component';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from 'app/admin/admin-routing.module';
import { AdminArtistComponent } from 'app/admin/artist/admin-artist.component';
import { AdminEditArtistComponent } from 'app/admin/artist/admin-edit-artist.component';

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
      AdminArtistComponent,
      AdminCreateArtistComponent,
      AdminEditArtistComponent
    ],
    providers: [
      AdminEditArtistResolve
    ]
  })
  export class AdminModule { }
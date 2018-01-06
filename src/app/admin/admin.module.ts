import { AdminCreateGenreComponent } from './genre/admin-create-genre.component';
import { AdminCreateEventComponent } from './event/admin-create-event.component';
import { AdminEditEventResolve } from 'app/admin/event/admin-edit-event.resolve';
import { AdminEditArtistResolve } from './artist/admin-edit-artist.resolve';
import { AdminEditEventComponent } from './event/admin-edit-event.component';
import { AdminEventComponent } from './event/admin-event.component';
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
import { CalendarModule, ColorPickerModule } from 'primeng/primeng';
import { AdminGenreComponent } from 'app/admin/genre/admin-genre.component';

@NgModule({
    imports:  [ 
      CommonModule,
      AdminRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      CustomMaterialModule,
      CalendarModule,
      ColorPickerModule,
      SharedModule
    ],
    declarations: [ 
      AdminDashboardComponent,
      AdminArtistComponent,
      AdminCreateArtistComponent,
      AdminEditArtistComponent,
      AdminEventComponent,
      AdminCreateEventComponent,
      AdminEditEventComponent,
      AdminGenreComponent,
      AdminCreateGenreComponent
    ],
    providers: [
      AdminEditArtistResolve,
      AdminEditEventResolve
    ]
  })
  export class AdminModule { }
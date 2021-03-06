import { AdminCreateVideoComponent } from './video/admin-create-video.component';
import { AdminReleaseArtistsResolve } from './release/admin-release-artists.resolve';
import { AdminReleaseComponent } from './release/admin-release.component';
import { AdminEditRolePermissionsResolve } from './roles/admin-edit-role-permissions.resolve';
import { AdminEditRoleResolve } from './roles/admin-edit-role.resolve';
import { AdminRoleComponent } from './roles/admin-role.component';
import { AdminEditUserRolesResolve } from './user/admin-edit-user-roles.resolve';
import { AdminEditGenreResolve } from './genre/admin-edit-genre.resolve';
import { AdminEditGenreComponent } from './genre/admin-edit-genre.component';
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
import { CalendarModule, ColorPickerModule, SliderModule, InputTextModule} from 'primeng/primeng';
import { AdminGenreComponent } from 'app/admin/genre/admin-genre.component';
import { AdminUserComponent } from 'app/admin/user/admin-user.component';
import { AdminEditUserComponent } from 'app/admin/user/admin-edit-user.component';
import { AdminEditUserResolve } from 'app/admin/user/admin-edit-user.resolve';
import { AdminEditRoleComponent } from 'app/admin/roles/admin-edit-role.component';
import { AdminCreateReleaseComponent } from 'app/admin/release/admin-create-release.component';
import { AdminReleaseGenresResolve } from 'app/admin/release/admin-release-genres.resolve';
import { AdminVideoComponent } from 'app/admin/video/admin-video.component';
import { AdminVideoSongsResolve } from 'app/admin/video/admin-video-songs.resolve';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports:  [ 
      CommonModule,
      AdminRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      CustomMaterialModule,
      CalendarModule,
      ColorPickerModule,
      SharedModule,
      SliderModule,
      HttpClientModule
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
      AdminCreateGenreComponent,
      AdminEditGenreComponent,
      AdminUserComponent,
      AdminEditUserComponent,
      AdminRoleComponent,
      AdminEditRoleComponent,
      AdminReleaseComponent,
      AdminCreateReleaseComponent,
      AdminVideoComponent,
      AdminCreateVideoComponent
    ],
    providers: [
      AdminEditArtistResolve,
      AdminEditEventResolve,
      AdminEditGenreResolve,
      AdminEditUserResolve,
      AdminEditUserRolesResolve,
      AdminEditRoleResolve,
      AdminEditRolePermissionsResolve,
      AdminReleaseArtistsResolve,
      AdminReleaseGenresResolve,
      AdminVideoSongsResolve
    ]
  })
  export class AdminModule { }
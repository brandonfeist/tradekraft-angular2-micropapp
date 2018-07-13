import { AdminVideoSongsResolve } from 'app/admin/video/admin-video-songs.resolve';
import { AdminCreateVideoComponent } from './video/admin-create-video.component';
import { AdminReleaseArtistsResolve } from './release/admin-release-artists.resolve';
import { AdminEditRolePermissionsResolve } from './roles/admin-edit-role-permissions.resolve';
import { AdminEditRoleResolve } from './roles/admin-edit-role.resolve';
import { AdminEditUserRolesResolve } from './user/admin-edit-user-roles.resolve';
import { AdminEditUserResolve } from 'app/admin/user/admin-edit-user.resolve';
import { AdminEditGenreComponent } from './genre/admin-edit-genre.component';
import { AdminCreateGenreComponent } from './genre/admin-create-genre.component';
import { AdminCreateEventComponent } from './event/admin-create-event.component';
import { AdminEditEventComponent } from './event/admin-edit-event.component';
import { AdminEventComponent } from './event/admin-event.component';
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from 'app/admin/admin.component';
import { AdminArtistComponent } from 'app/admin/artist/admin-artist.component';
import { AdminCreateArtistComponent } from 'app/admin/artist/admin-create-artist.component';
import { AdminEditArtistComponent } from 'app/admin/artist/admin-edit-artist.component';
import { AdminEditArtistResolve } from 'app/admin/artist/admin-edit-artist.resolve';
import { AdminEditEventResolve } from 'app/admin/event/admin-edit-event.resolve';
import { AdminGenreComponent } from 'app/admin/genre/admin-genre.component';
import { AdminEditGenreResolve } from 'app/admin/genre/admin-edit-genre.resolve';
import { AdminUserComponent } from 'app/admin/user/admin-user.component';
import { AdminEditUserComponent } from 'app/admin/user/admin-edit-user.component';
import { AdminRoleComponent } from 'app/admin/roles/admin-role.component';
import { AdminEditRoleComponent } from 'app/admin/roles/admin-edit-role.component';
import { AdminReleaseComponent } from 'app/admin/release/admin-release.component';
import { AdminCreateReleaseComponent } from 'app/admin/release/admin-create-release.component';
import { AdminReleaseGenresResolve } from 'app/admin/release/admin-release-genres.resolve';
import { AdminVideoComponent } from 'app/admin/video/admin-video.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'dashboard', component: AdminDashboardComponent },
            { path: 'dashboard', component: AdminDashboardComponent },
            
            { path: 'artists', component: AdminArtistComponent },
            { path: 'artists/create', component: AdminCreateArtistComponent },
            { 
                path: 'artists/edit/:slug', component: AdminEditArtistComponent,
                resolve: { artist: AdminEditArtistResolve }
            },
            { path: 'releases', component: AdminReleaseComponent },
            { path: "events", component: AdminEventComponent },
            { path: "events/create", component: AdminCreateEventComponent },
            {
                path: 'events/edit/:slug', component: AdminEditEventComponent,
                resolve: { event: AdminEditEventResolve }
            },
            { path: "releases", component: AdminReleaseComponent },
            { 
                path: "releases/create", component: AdminCreateReleaseComponent,
                resolve: {
                    artists: AdminReleaseArtistsResolve,
                    genres: AdminReleaseGenresResolve
                }
            },
            { path: "genres", component: AdminGenreComponent },
            { path: "genres/create", component: AdminCreateGenreComponent },
            {
                path: 'genres/edit/:id', component: AdminEditGenreComponent,
                resolve: { genre: AdminEditGenreResolve }
            },
            { path: 'users', component: AdminUserComponent },
            {
                path: 'users/edit/:username', component: AdminEditUserComponent,
                resolve: { 
                    user: AdminEditUserResolve,
                    roles: AdminEditUserRolesResolve
                }
            },
            { path: 'roles', component: AdminRoleComponent },
            {
                path: 'roles/edit/:name', component: AdminEditRoleComponent,
                resolve: {
                    role: AdminEditRoleResolve,
                    permissions: AdminEditRolePermissionsResolve
                }
            },
            { path: 'videos', component: AdminVideoComponent },
            {
                path: 'videos/create', component: AdminCreateVideoComponent,
                resolve: {
                    songs: AdminVideoSongsResolve
                }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
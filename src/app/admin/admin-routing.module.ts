import { AdminCreateEventComponent } from './event/admin-create-event.component';
import { AdminEditEventComponent } from './event/admin-edit-event.component';
import { AdminEventComponent } from './event/admin-event.component';
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import { AdminDashboardComponent } from 'app/admin/admin.component';
import { AdminArtistComponent } from 'app/admin/artist/admin-artist.component';
import { AdminCreateArtistComponent } from 'app/admin/artist/admin-create-artist.component';
import { AdminEditArtistComponent } from 'app/admin/artist/admin-edit-artist.component';
import { AdminEditArtistResolve } from 'app/admin/artist/admin-edit-artist.resolve';
import { AdminEditEventResolve } from 'app/admin/event/admin-edit-event.resolve';

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
            { path: "events", component: AdminEventComponent },
            { path: "events/create", component: AdminCreateEventComponent },
            {
                path: 'events/edit/:slug', component: AdminEditEventComponent,
                resolve: { event: AdminEditEventResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
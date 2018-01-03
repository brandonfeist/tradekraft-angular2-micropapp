import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import { AdminDashboardComponent } from 'app/admin/admin.component';
import { AdminArtistComponent } from 'app/admin/artist/admin-artist.component';
import { AdminCreateArtistComponent } from 'app/admin/artist/admin-create-artist.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'dashboard', component: AdminDashboardComponent },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'artists', component: AdminArtistComponent },
            { path: 'artists/create', component: AdminCreateArtistComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
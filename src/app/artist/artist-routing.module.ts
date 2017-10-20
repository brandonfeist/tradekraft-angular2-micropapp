import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import { ArtistComponent } from './artist.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistDetailsResolve } from './artist-details/artist-details.resolve';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ArtistComponent },
            { path: ':slug', component: ArtistDetailsComponent,
                resolve: { artist: ArtistDetailsResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ArtistRoutingModule {}
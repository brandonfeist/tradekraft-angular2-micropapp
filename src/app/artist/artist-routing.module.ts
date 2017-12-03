import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import { ArtistComponent } from './artist.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistDetailsResolve } from './artist-details/artist-details.resolve';
import { ArtistYearsResolve } from 'app/artist/artist-year.resolve';

@NgModule({
    imports: [
        RouterModule.forChild([
            { 
                path: '', component: ArtistComponent,
                resolve: { years: ArtistYearsResolve }
            },
            { 
                path: ':slug', component: ArtistDetailsComponent,
                resolve: { artist: ArtistDetailsResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ArtistRoutingModule {}
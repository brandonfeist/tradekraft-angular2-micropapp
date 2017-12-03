import { ReleaseGenresResolve } from './release-genre.resolve';
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import { ReleaseComponent } from './release.component';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { ReleaseDetailsResolve } from './release-details/release-details.resolve';

@NgModule({
    imports: [
        RouterModule.forChild([
            { 
                path: '', component: ReleaseComponent,
                resolve: { genres: ReleaseGenresResolve } 
            },
            { 
                path: ':slug', component: ReleaseDetailsComponent,
                resolve: { release: ReleaseDetailsResolve }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ReleaseRoutingModule {}
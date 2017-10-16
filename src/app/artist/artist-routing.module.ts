import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import { ArtistComponent } from './artist.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ArtistComponent
                // children: [
                //     {
                //         path: '',
                //         component: TasksListComponent
                //     },
                //     {
                //         path: ':id',
                //         component: TaskDetailComponent,
                //     }
                // ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ArtistRoutingModule {}
import { SpotifyConnectComponent } from './spotify/spotify-connect.component';
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'spotify',
                component: SpotifyConnectComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ConnectRoutingModule {}
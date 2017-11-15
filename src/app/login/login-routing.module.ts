import { SpotifyLoginComponent } from './spotify/spotify-login.component';
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'check-spotify',
                component: SpotifyLoginComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule {}
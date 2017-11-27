import { SpotifyLoginComponent } from './spotify/spotify-login.component';
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: LoginComponent },
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
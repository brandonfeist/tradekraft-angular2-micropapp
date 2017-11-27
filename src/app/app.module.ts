import { AuthGuard } from './services/guard/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { MatDialog } from '@angular/material';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { HomeModule }    from './home/home.module';
import { PageNotFoundModule } from './404/not-found.module';
import { NavbarModule } from './navbar/navbar.module';
import { MusicModule } from './music/music.module';

import { ReleaseService } from './services/release.service';
import { EventService } from './services/event.service';
import { SpotifyService } from './services/spotify.service';
import { MusicService } from './services/music.service';
import { RoleGuard } from 'app/services/guard/role-guard.service';
import { SnackbarService } from 'app/services/snackbar.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    NavbarModule,
    MusicModule,
    CustomMaterialModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PageNotFoundModule
  ],
  providers: [ 
    Title,
    ReleaseService,
    EventService,
    SpotifyService,
    MusicService,
    SpotifyService,
    AuthService,
    SnackbarService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PageNotFoundModule,
    NavbarModule,
    MusicModule
  ],
  providers: [ 
    Title,
    ReleaseService,
    EventService,
    SpotifyService,
    MusicService,
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

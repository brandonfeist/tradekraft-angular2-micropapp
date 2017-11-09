import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';

import { HomeModule }    from './home/home.module';
import { PageNotFoundModule } from './404/not-found.module';
import { NavbarModule } from './navbar/navbar.module';
import { MusicModule } from './music/music.module';

import { EventService } from './services/event.service';
import { SpotifyService } from './services/spotify.service';
import { MusicService } from './services/music.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpModule,
    SlimLoadingBarModule.forRoot(),
    AppRoutingModule,
    PageNotFoundModule,
    NavbarModule,
    MusicModule
  ],
  providers: [ 
    EventService,
    SpotifyService,
    MusicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

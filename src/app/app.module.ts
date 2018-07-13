import { VideoService } from './services/video.service';
import { YearService } from './services/year.service';
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
import { GenreService } from 'app/services/genre.service';
import { FooterModule } from 'app/footer/footer.module';
import { ArtistService } from 'app/services/artist.service';
import { SongService } from 'app/services/song.service';
import { SpinnerService } from 'app/services/spinner.service';

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
    PageNotFoundModule,
    FooterModule
  ],
  providers: [ 
    Title,
    ArtistService,
    ReleaseService,
    SongService,
    GenreService,
    EventService,
    SpotifyService,
    MusicService,
    VideoService,
    YearService,
    SpotifyService,
    AuthService,
    SnackbarService,
    SpinnerService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

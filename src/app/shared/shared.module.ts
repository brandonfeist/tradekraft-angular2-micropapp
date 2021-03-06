import { SpinnerModule } from './../spinner/spinner.module';
import { CreateSongDialog } from './dialogs/create-song/create-song.component';
import { TinyMceComponent } from './tinymce/tinymce.component';
import { ShareReleaseDialog } from './dialogs/share-release/share-release.component';
import { NewsletterDialog } from './dialogs/newsletter/newsletter.component';
import { ArtistContainerComponent } from './artist/artist-container/artist-container.component';
import { EventContainerComponent } from './event/event-container/event-container.component';
import { PlaylistSpotifyDialog } from './dialogs/playlist-spotify/playlist-spotify.component';
import { ArtistSpotifyDialog } from './dialogs/artist-spotify/artist-spotify.component';
import { ReleaseContainerComponent } from './release/release-container/release-container.component';
import { ReleasePreviewComponent } from './release/release-preview/release-preview.component';
import { MusicTableComponent } from './music-table/music-table.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventPreviewComponent } from './event/event-preview/event-preview.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAbbr } from 'app/shared/date-abbr/date-abbr';
import { AuthModule } from 'app/auth/auth.module';
import { ImgService } from './img-service/img-service';

@NgModule({
    imports:  [ 
      CommonModule,
      RouterModule,
      CustomMaterialModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      SpinnerModule,
      AuthModule
    ],
    exports: [
      MusicTableComponent,
      EventPreviewComponent,
      EventContainerComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistContainerComponent,
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog,
      NewsletterDialog,
      ShareReleaseDialog,
      CreateSongDialog,
      ReadMoreComponent,
      TinyMceComponent
    ],
    declarations: [ 
      MusicTableComponent,
      EventPreviewComponent,
      EventContainerComponent,
      ArtistContainerComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog,
      NewsletterDialog,
      ShareReleaseDialog,
      CreateSongDialog,
      ReadMoreComponent,
      TinyMceComponent
    ],
    providers: [
      DateAbbr,
      ImgService
    ],
    entryComponents: [
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog,
      NewsletterDialog,
      ShareReleaseDialog,
      CreateSongDialog
    ]
  })
  export class SharedModule { }
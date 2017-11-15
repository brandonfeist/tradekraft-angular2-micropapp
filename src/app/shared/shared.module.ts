import { ArtistSpotifyDialog } from './dialogs/artist-spotify/artist-spotify.component';
import { ReleaseContainerComponent } from './release/release-container/release-container.component';
import { ReleasePreviewComponent } from './release/release-preview/release-preview.component';
import { MusicTableComponent } from './music-table/music-table.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventPreviewComponent } from './event-preview/event-preview.component';
import { ReadMoreComponent } from './read-more/read-more.component';

@NgModule({
    imports:  [ 
      CommonModule,
      RouterModule,
      LazyLoadImageModule
    ],
    exports: [
      MusicTableComponent,
      EventPreviewComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistSpotifyDialog,
      ReadMoreComponent
    ],
    declarations: [ 
      MusicTableComponent,
      EventPreviewComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistSpotifyDialog,
      ReadMoreComponent
    ],
    entryComponents: [
      ArtistSpotifyDialog
    ]
  })
  export class SharedModule { }
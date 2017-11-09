import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicPlayerComponent } from './music-player/music-player.component';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [
      MusicPlayerComponent,
    ],
    declarations: [
      MusicPlayerComponent,
    ],
})
export class MusicModule { }
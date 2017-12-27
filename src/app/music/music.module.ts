import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicPlayerComponent } from './music-player/music-player.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';

@NgModule({
    imports: [
      CommonModule,
      CustomMaterialModule
    ],
    exports: [
      MusicPlayerComponent,
    ],
    declarations: [
      MusicPlayerComponent,
    ],
})
export class MusicModule { }
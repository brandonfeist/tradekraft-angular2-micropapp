import { Song } from './../../release/song';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import { MusicService } from './../../services/music.service';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html'
})
export class MusicPlayerComponent implements OnInit {
  private paused: boolean;
  private audio;
  private title: string;
  private currentPlayTime: number;

  private pauseSubscription;
  private audioSubscription;

  constructor(private musicService: MusicService) {
    this.paused = true;
  }

  ngOnInit() {
    this.pauseSubscription = this.musicService.pauseChange.subscribe((paused) => { 
      this.paused = paused; 
    });

    this.audioSubscription = this.musicService.audioChange.subscribe((audio) => { 
      this.audio = audio; 
    });

    Observable.interval(1000).subscribe(x => {
      this.getCurrentPlayTime();
    });
  }

  ngOnDestroy() {
    this.pauseSubscription.unsubscribe();
    this.audioSubscription.unsubscribe();
  }

  // Played
  @Input() elapsed: string;
  // Total time
  @Input() total: string;
  // Current time for the progress bar
  @Input() current: number;

  getCurrentPlayTime() {
    if(this.audio) {
      this.currentPlayTime = Math.round(this.audio.currentTime);

      return;
    }

    this.currentPlayTime = undefined;

    return;
  }

  pausePlay() {
    this.musicService.pausePlay();
    this.getCurrentPlayTime();
  }

  stop() {
    this.musicService.stop();
    this.getCurrentPlayTime();
  }
}
import { ShareReleaseDialog } from './../../shared/dialogs/share-release/share-release.component';
import { Release } from './../../model/release';
import { Artist } from './../../model/artist';
import { Song } from './../../model/song';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import { MusicService } from './../../services/music.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html'
})
export class MusicPlayerComponent implements OnInit {
  private MUSIC_BAR_STEP: number = 0.25;
  private MUSIC_PLAY_UPDATE_INTERVAL: number = 50;

  private volumeButtonHover: boolean = false;
  private volumeSliderHover: boolean = false;

  private scrubPosistion: string;
  private muted: boolean = false;
  private previousVolume: number;
  private volume: number;
  private paused: boolean;
  private audio;
  private release: Release;
  private song: Song;
  private title: string;
  private currentPlayTime: number;

  private pauseSubscription;
  private audioSubscription;
  private songSubscription;
  private releaseSubscription;

  constructor(private musicService: MusicService, public dialog: MatDialog) {
    this.volume = 1;
    this.paused = true;
    this.scrubPosistion = '0%';
  }

  ngOnInit() {
    this.pauseSubscription = this.musicService.pauseChange.subscribe((paused) => { 
      this.paused = paused; 
    });

    this.audioSubscription = this.musicService.audioChange.subscribe((audio) => { 
      this.audio = audio;
    });

    this.songSubscription = this.musicService.songChange.subscribe((song) => {
      this.song = song;
    });

    this.releaseSubscription = this.musicService.releaseChange.subscribe((release) => {
      this.release = release;
    });

    Observable.interval(this.MUSIC_PLAY_UPDATE_INTERVAL).subscribe(x => {
      this.getCurrentPlayTime();
      this.scrubPosistion = this.getSongProgress() + '%';
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

  private getCurrentPlayTime() {
    if(this.audio) {
      this.currentPlayTime = this.audio.currentTime;

      return;
    }

    this.currentPlayTime = undefined;

    return;
  }

  private pausePlay() {
    this.musicService.pausePlay();
    this.getCurrentPlayTime();
  }

  private stop() {
    this.musicService.stop();
    this.getCurrentPlayTime();
  }

  private formatSecondsToTimestamp(timeInSeconds: number): string {
    if(timeInSeconds == null || isNaN(timeInSeconds)) {
      return "00:00";
    }

    timeInSeconds = Math.trunc(timeInSeconds);
    
    let minutes = Math.trunc(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    let formatedMin = "00" + minutes;
    let formatedSec = "00" + seconds

    return formatedMin.substr(formatedMin.length - 2) + ":" + formatedSec.substr(formatedSec.length - 2);
  }

  private onVolumeInputChange(event: any) {
    this.muted = false;
    this.volume = event.value / 100;
    this.musicService.changeVolume(this.volume);
  }

  private currentPlaytimeChange(newPlaytime: number) {
    this.currentPlayTime = newPlaytime;
    this.musicService.changePlaytime(this.currentPlayTime);
  }

  private muteUnmute() {
    if(this.muted) {
      this.volume = this.previousVolume;
      this.musicService.changeVolume(this.volume);
    } else {
        this.previousVolume = this.volume;
        this.volume = 0;
        this.musicService.changeVolume(this.volume);
    }

    this.muted = !this.muted;
  }

  private isVolumeOn() {
    return this.volume > 0;
  }

  private getSongProgress(): number {
    if(this.audio && this.currentPlayTime) {
      return ((this.currentPlayTime / this.audio.duration) * 100);
    }

    return 0;
  }

  private scrubClickEvent(event) {
    let playPos = (event.screenX / window.screen.width);

    if(this.audio) {
      this.currentPlaytimeChange(this.audio.duration * playPos);
    }
  }

  private showShareDialog() {
    this.dialog.open(ShareReleaseDialog, {
      height: '350px',
      data: { release: this.release }
    });
  }

  private exit() {
    this.musicService.stopAndUnload();
    this.song = null;
  }
}
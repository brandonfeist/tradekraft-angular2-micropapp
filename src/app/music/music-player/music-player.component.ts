import { Release } from './../../model/release';
import { Artist } from './../../model/artist';
import { Song } from './../../model/song';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import { MusicService } from './../../services/music.service';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html'
})
export class MusicPlayerComponent implements OnInit {
  private MUSIC_BAR_STEP: number = 0.25;
  private MUSIC_PLAY_UPDATE_INTERVAL: number = 250;

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

  constructor(private musicService: MusicService) {
    this.volume = 100;
    this.paused = true;
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
    }) 

    this.releaseSubscription = this.musicService.releaseChange.subscribe((release) => {
      this.release = release;
    })

    Observable.interval(this.MUSIC_PLAY_UPDATE_INTERVAL).subscribe(x => {
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
      this.currentPlayTime = this.audio.currentTime;

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

  formatArtists(song: Song) {
    let artistsNameString = "";
    let artists: Artist[] = song.artists;

    for(let artistIndex = 0; artistIndex < artists.length; artistIndex++) {
      if(artistIndex < artists.length - 1) {
        artistsNameString += artists[artistIndex].name + ", ";
      } else {
        artistsNameString += artists[artistIndex].name;
      }
    }

      return artistsNameString
  }

  private formatSecondsToTimestamp(timeInSeconds: number): string {
    timeInSeconds = Math.trunc(timeInSeconds);
    
    let minutes = Math.trunc(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    let formatedMin = "00" + minutes;
    let formatedSec = "00" + seconds

    return formatedMin.substr(formatedMin.length - 2) + ":" + formatedSec.substr(formatedSec.length - 2);
  }

  onVolumeInputChange(event: any) {
    this.muted = false;
    this.volume = event.value;
    this.musicService.changeVolume(this.volume / 100);
  }

  onTimeInputChange(event: any) {
    this.currentPlayTime = event.value;
    this.musicService.changePlaytime(this.currentPlayTime);
  }

  muteUnmute() {
    if(this.muted) {
      this.volume = this.previousVolume;
      this.musicService.changeVolume(this.volume / 100);
    } else {
        this.previousVolume = this.volume;
        this.volume = 0;
        this.musicService.changeVolume(this.volume / 100);
    }

    this.muted = !this.muted;
  }

  private isVolumeOn() {
    return this.volume > 0;
  }

  exit() {
    this.musicService.stopAndUnload();
    this.song = null;
  }
}
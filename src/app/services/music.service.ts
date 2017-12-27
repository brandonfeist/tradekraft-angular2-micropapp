import { Release } from './../model/release';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject }  from 'rxjs/Subject';

import * as _ from "lodash";

import { Song } from './../model/song';

@Injectable()
export class MusicService {
    private audio;
    private volume: number = 1;
    private paused;
    private songIndexNumber: number;
    private songs: Song[];
    private song: Song;
    private release: Release;
    private playPromise;
    
    private previousVolume: number;
    private muted: boolean = false;

    pauseChange: Subject<boolean> = new Subject<boolean>();
    audioChange: Subject<object> = new Subject<object>();
    songChange: Subject<Song> = new Subject<Song>();
    releaseChange: Subject<Release> = new Subject<Release>();

    constructor() {
        this.audio = new Audio();
        this.paused = true;
    }

    load(release: Release, songIndexNumber: number) {
        let songs: Song[] = release.songs;
        
        if(!_.isEmpty(songs[songIndexNumber].songFile)) {
            this.songs = songs;
            this.release = release;
            this.song = songs[songIndexNumber]
            this.songIndexNumber = songIndexNumber;

            if(this.song.songFile.external) {
                this.audio.src = this.song.songFile.external;
            } else {
                this.audio.src = this.song.songFile.m4a;
            }

            this.audio.load();

            this.audioChange.next(this.audio);
            this.songChange.next(this.song); 
            this.releaseChange.next(this.release)

            this.audio.volume = this.volume;
            this.playPromise = this.audio.play();
            this.paused = false;
            this.pauseChange.next(this.paused);

            this.audio.onended = () => {
                if((this.songIndexNumber + 1) < songs.length) {
                    this.load(release, (this.songIndexNumber + 1));
                } else {
                    this.stop();
                }
            }
        }
    }

    changeVolume(volume: number) {
        this.volume = volume * volume;
        this.audio.volume = this.volume;
    }

    changePlaytime(playtime: number) {
        this.audio.currentTime = playtime;
    }

    pausePlay() {
        if(this.audio.src) {
            if(this.paused) {
                this.playPromise = this.audio.play();
            } else {
                this.audio.pause();
            }

            this.paused = !this.paused;
            this.pauseChange.next(this.paused);
        }
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.paused = true;
        this.pauseChange.next(this.paused);
    }

    stopAndUnload() {
        this.stop();
        this.audio = new Audio();
        this.songs = null;
        this.song = null;
        this.release = null;
    }

    isSongLoaded() {
        return this.song != null;
    }

    isSongPlaying() {
        return this.isSongLoaded && !this.audio.paused;
    }

    getPausedState(): boolean {
        return this.paused;
    }

    getSongPlaying(): Song {
        return this.song;
    }
}
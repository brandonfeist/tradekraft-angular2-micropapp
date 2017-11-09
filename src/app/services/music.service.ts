import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject }  from 'rxjs/Subject';

import { Song } from './../release/song';

@Injectable()
export class MusicService {
    private audio;
    private paused;
    private song: Song;
    private playPromise;

    pauseChange: Subject<boolean> = new Subject<boolean>();
    audioChange: Subject<object> = new Subject<object>();
    songChange: Subject<Song> = new Subject<Song>();

    constructor() {
        this.audio = new Audio();
        this.paused = true;
    }

    load(song: Song) {
        this.song = song;
        this.audio.src = song.songFile.m4a;
        this.audio.load();

        this.audioChange.next(this.audio);
        this.songChange.next(this.song);

        this.playPromise = this.audio.play();
        this.paused = false;
        this.pauseChange.next(this.paused);
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
}
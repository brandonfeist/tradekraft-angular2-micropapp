import { Release } from 'app/model/release';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from "lodash";

import { MusicService } from './../../services/music.service';

import { Song } from './../../model/song';

@Component({
    selector: 'music-table',
    templateUrl: './music-table.component.html'
})
export class MusicTableComponent implements OnInit {
    @Input() release: Release;
    @Input() songs: Song[];

    private tooltipPos: string;
    private currentSongLoaded: Song;
    private paused: boolean;

    private pauseSubscription;
    private songSubscription;

    constructor(private musicService: MusicService) { 
        this.tooltipPos = "right";
        this.paused = true;
    }

    ngOnInit() {
        this.pauseSubscription = this.musicService.pauseChange.subscribe((paused) => { 
            this.paused = paused; 
        });
        
        this.songSubscription = this.musicService.songChange.subscribe((song) => { 
            this.currentSongLoaded = song; 
            this.checkIfSongPlaying(this.currentSongLoaded);
        });

        this.paused = this.musicService.getPausedState();
        this.currentSongLoaded = this.musicService.getSongPlaying();
    }

     ngOnDestroy() {
        this.pauseSubscription.unsubscribe();
        this.songSubscription.unsubscribe();
    }

    playSong(release: Release, songIndex: number) {
        let song = release.songs[songIndex];

        if (this.checkIfSongPlaying(song)) {
            this.musicService.pausePlay();
        } else if (this.currentSongLoaded && this.currentSongLoaded.slug === song.slug) {;
            this.musicService.pausePlay();
        } else {
            this.musicService.load(release, songIndex);
        }
    }

    checkIfSongPlaying(song: Song): boolean {
        if (!this.paused && this.currentSongLoaded.slug === song.slug) {
            return true;
        }

        return false;
    }

    songAvailable(song: Song): boolean {
        return !_.isEmpty(song.songFile);
    }
}
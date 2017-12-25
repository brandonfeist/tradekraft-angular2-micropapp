import { Song } from './../model/song';
import { Release } from 'app/model/release';
import { SnackbarService } from './../services/snackbar.service';
import { VideoService } from './../services/video.service';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Video } from 'app/model/video';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'app/model/artist';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
  })
  export class HomeComponent implements OnInit {

    @ViewChild('featureVideo') videoplayer: any;

    private randomVideo: Video;

    private videoTitle: string;

    private videoSubtitle: string;

    private videoThumnail: string;

    private videoMp4Link: string;

    private videoWebmLink: string;

    constructor(private videoService: VideoService, private route: ActivatedRoute, 
      private router: Router, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService) { }

    ngOnInit() {
      this.randomVideo = this.activatedRoute.snapshot.data['featuredVideo'];

      this.getRandomFeaturedVideo();
    }

    ngAfterViewInit() {
      this.videoplayer.nativeElement.muted = true;

      this.videoplayer.nativeElement.play()
    }

    private getRandomFeaturedVideo() {
      this.videoTitle = this.randomVideo.name;

      if(this.randomVideo.song) {
        this.videoTitle = this.randomVideo.song.name;
        this.videoSubtitle = this.formatSongArtists(this.randomVideo.song.artists);
      }

      this.videoThumnail = this.randomVideo.videoThumbnail;

      this.videoMp4Link = this.randomVideo.videoFile.mp4_preview;

      this.videoWebmLink = this.randomVideo.videoFile.webm_preview;
    }

    formatSongArtists(artists: Artist[]): string {
      if (Object.keys(artists).length > 2) {
        return "Various Artists";
      } else {
        let artistsNameString = "";
  
        artists.sort();
  
        for (let artistStringIndex = 0; artistStringIndex < artists.length; artistStringIndex++) {
          if (artistStringIndex == 0) {
            artistsNameString += artists[artistStringIndex].name;
          } else {
            artistsNameString += (" & " + artists[artistStringIndex].name);
          }
        }
  
        return artistsNameString
      }
    }

    private muteFeatureVideo() {
      this.videoplayer.nativeElement.muted = !this.videoplayer.nativeElement.muted;
    }

    private isFeatureMuted(): boolean {
      if(this.videoplayer) {
        return this.videoplayer.nativeElement.muted;
      }

      return true;
    }
  }
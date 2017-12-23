import { Release } from 'app/model/release';
import { SnackbarService } from './../services/snackbar.service';
import { VideoService } from './../services/video.service';
import { Component, OnInit }      from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Video } from 'app/model/video';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
  })
  export class HomeComponent implements OnInit {

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

    private getRandomFeaturedVideo() {
      this.videoTitle = this.randomVideo.name;

      if(this.randomVideo.release) {
        this.videoSubtitle = this.formatReleaseArtists(this.randomVideo.release);
      }

      this.videoThumnail = this.randomVideo.videoThumbnail;

      this.videoMp4Link = this.randomVideo.videoFile.mp4_preview;

      this.videoWebmLink = this.randomVideo.videoFile.webm_preview;
    }

    formatReleaseArtists(release): string {
      let songs = release.songs;
      let artists = {};
  
      for (let songIndex = 0; songIndex < songs.length; songIndex++) {
        let tempArtists = songs[songIndex].artists;
        for (let artistIndex = 0; artistIndex < tempArtists.length; artistIndex++) {
          artists[tempArtists[artistIndex].slug] = tempArtists[artistIndex].name;
        }
      }
  
      if (Object.keys(artists).length > 2) {
        return "Various Artists";
      } else {
        let artistsNameString = "";
        let tempArtistArray = [];
  
        for (var property in artists) {
          if (artists.hasOwnProperty(property)) {
            tempArtistArray.push(artists[property]);
          }
        }
  
        tempArtistArray.sort();
  
        for (let artistStringIndex = 0; artistStringIndex < tempArtistArray.length; artistStringIndex++) {
          if (artistStringIndex == 0) {
            artistsNameString += tempArtistArray[artistStringIndex];
          } else {
            artistsNameString += (" & " + tempArtistArray[artistStringIndex]);
          }
        }
  
        return artistsNameString
      }
    }
  }
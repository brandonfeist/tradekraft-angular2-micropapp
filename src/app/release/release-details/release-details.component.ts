import { AppSettings } from 'app/app-settings';
import { Song } from './../../model/song';
import { Artist } from './../../model/artist';
import { Component, OnInit }  from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment-timezone';

import { Release } from './../../model/release';
import { ReleaseService } from './../../services/release.service';
import { MusicService } from './../../services/music.service';
import { PlaylistSpotifyDialog } from 'app/shared/dialogs/playlist-spotify/playlist-spotify.component';
import { Video } from 'app/model/video';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  templateUrl: './release-details.component.html'
})
export class ReleaseDetailsComponent implements OnInit {
  private releaseSlug: string;
  private release: Release;
  private artists: Artist[];
  private songs: Song[];
  defaultImage: string = AppSettings.loadImage;
  errorImage: string = AppSettings.errorImage;

  private paramSubscription: any;
  private pauseSubscription;
  private songSubscription;

  constructor(private releaseService: ReleaseService, private musicService: MusicService, private activatedRoute: ActivatedRoute,
    private router: ActivatedRoute, public dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.releaseSlug = params['slug']);

    this.release = this.router.snapshot.data['release'];

    this.artists = this.getArtists(this.release);

    this.songs = this.release.songs;
  }
  

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  formatReleaseDate(releaseDate: Date): string {
    return moment(releaseDate).format('MMM DD, YYYY');
  }

  getArtists(release: Release): Artist[] {
    let songs = release.songs;
    let artists = {};
    let returnArtistArray: Artist[] = [];

    for(let songIndex = 0; songIndex < songs.length; songIndex++) {
      let tempArtists = songs[songIndex].artists;
      for(let artistIndex = 0; artistIndex < tempArtists.length; artistIndex++) {
        artists[tempArtists[artistIndex].slug] = tempArtists[artistIndex];
      }
    }

    for (var property in artists) {
      if (artists.hasOwnProperty(property)) {
        returnArtistArray.push(artists[property]);
      }
    }

    returnArtistArray.sort(function(a, b) { 
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    })

    return returnArtistArray;
  }

  formatReleaseArtists(release: Release): string {
    let songs = release.songs;
    let artists = {};

    for(let songIndex = 0; songIndex < songs.length; songIndex++) {
      let tempArtists = songs[songIndex].artists;
      for(let artistIndex = 0; artistIndex < tempArtists.length; artistIndex++) {
        artists[tempArtists[artistIndex].slug] = tempArtists[artistIndex].name;
      }
    }

    let artistsNameString = "";
    let tempArtistArray = [];

    for (var property in artists) {
      if (artists.hasOwnProperty(property)) {
        tempArtistArray.push(artists[property]);
      }
    }

    tempArtistArray.sort();

    for(let artistStringIndex = 0; artistStringIndex < tempArtistArray.length; artistStringIndex++) {
      if(artistStringIndex == 0) {
        artistsNameString += tempArtistArray[artistStringIndex];
      } else {
        if(tempArtistArray.length == 2) {
          artistsNameString += (" & " + tempArtistArray[artistStringIndex]);
        } else {
          artistsNameString += (", " + tempArtistArray[artistStringIndex]);
        }
      }
    }

    return artistsNameString
  }

  hasVideos(): boolean {
    let songs: Song[] = this.release.songs

    for(let songIndex = 0; songIndex < songs.length; songIndex++) {
      if(songs[songIndex].videos && songs[songIndex].videos.length > 0) {
        return true;
      }
    }

    return false;
  }

  getVideos(): Video[] {
    let videos: Video[] = [];
    let songs: Song[] = this.release.songs

    for(let songIndex = 0; songIndex < songs.length; songIndex++) {
      if(songs[songIndex].videos.length > 0) {
        videos = videos.concat(songs[songIndex].videos);
      }
    }

    return videos;
  }

  getVideoEmbedUrl(video: Video) {
    let youtubeLink: string = video.youtubeUrl;
    console.log("https://www.youtube.com/embed/" + youtubeLink.match(/youtube.com\/watch\?v=(\S+)/)[1]);
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + youtubeLink.match(/youtube.com\/watch\?v=(\S+)/)[1]);
  }

  openSpotifyDialog() {
    this.dialog.open(PlaylistSpotifyDialog, {
      height: '450px',
      data: { release: this.release }
    });
  }

  private isFreeRelease() {
    return this.release.freeRelease;
  }
}
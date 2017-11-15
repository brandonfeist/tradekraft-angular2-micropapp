import { Song } from './../song';
import { Artist } from './../../artist/artist';
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment-timezone';

import { Release } from './../release';
import { ReleaseService } from './../../services/release.service';
import { MusicService } from './../../services/music.service';

@Component({
  templateUrl: './release-details.component.html'
})
export class ReleaseDetailsComponent implements OnInit {
  private releaseSlug: string;
  private release: Release;
  private artists: Artist[];
  private songs: Song[];
  defaultImage: string = "assets/images/preload-image.jpg";
  errorImage: string = "assets/images/error-image.jpg";

  private paramSubscription: any;
  private pauseSubscription;
  private songSubscription;

  constructor(private releaseService: ReleaseService, private musicService: MusicService, private activatedRoute: ActivatedRoute,
    private router: ActivatedRoute) { }

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

  addToSpotifyPlaylist(spotifyLink: string) {
    console.log("adding to spotify playlist");
  }
}
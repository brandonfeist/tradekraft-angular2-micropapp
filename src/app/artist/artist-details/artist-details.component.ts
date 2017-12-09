import { Component, OnInit, Inject }  from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment-timezone';

import { ArtistSpotifyDialog } from './../../shared/dialogs/artist-spotify/artist-spotify.component';

import { ArtistService } from './../artist.service';
import { Artist } from './../../model/artist';
import { Event } from './../../model/event';

@Component({
  templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit {
  private artistSlug: string;
  private paramSubscription: any;
  private artist: Artist;
  defaultImage: string = "assets/images/preload-image.jpg";
  errorImage: string = "assets/images/error-image.jpg";

  constructor(private artistService: ArtistService, private activatedRoute: ActivatedRoute, 
    private router: Router, public dialog: MatDialog) {}

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.artistSlug = params['slug']);

    this.artist = this.activatedRoute.snapshot.data['artist'];

    this.processArtistEvents(this.artist.events);
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  openSpotifyDialog() {
    this.dialog.open(ArtistSpotifyDialog, {
      data: { artist: this.artist }
    });
  }

  processArtistEvents(events: Event[]) {
    let indexToSplice: number[] = new Array();

    let now = new Date();
    now.setHours(23);
    now.setMinutes(59);
    now.setSeconds(59);
    now.setMilliseconds(999);

    for(let eventIndex = (events.length - 1); eventIndex >= 0; eventIndex--) {

      let eventStartDate = new Date(events[eventIndex].startDateTime);
      eventStartDate.setHours(23);
      eventStartDate.setMinutes(59);
      eventStartDate.setSeconds(59);
      eventStartDate.setMilliseconds(999);
      
      console.log("check: " + (eventStartDate.getDay() - now.getDay()));
      
      if((eventStartDate.getDay() - now.getDay()) < 0) {
        events.splice(eventIndex, 1);
      }
    }
  }

  formatReleaseArtists(release): string {
    let songs = release.songs;
    let artists = {};

    for(let songIndex = 0; songIndex < songs.length; songIndex++) {
      let tempArtists = songs[songIndex].artists;
      for(let artistIndex = 0; artistIndex < tempArtists.length; artistIndex++) {
        artists[tempArtists[artistIndex].slug] = tempArtists[artistIndex].name;
      }
    }

    if(Object.keys(artists).length > 2) {
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

      for(let artistStringIndex = 0; artistStringIndex < tempArtistArray.length; artistStringIndex++) {
        if(artistStringIndex == 0) {
          artistsNameString += tempArtistArray[artistStringIndex];
        } else {
          artistsNameString += (" & " + tempArtistArray[artistStringIndex]);
        }
      }

      return artistsNameString
    }
  }
}
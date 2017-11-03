import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment-timezone';

import { ArtistService } from './../artist.service';
import { Artist } from './../artist';
import { Event } from './../../event/event';

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
    private router: ActivatedRoute) { }

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.artistSlug = params['slug']);

    this.artist = this.router.snapshot.data['artist'];
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  formatEventStartDateTime(event: Event) {
    let formatedStartDateTime = moment(event.startDateTime);

    return formatedStartDateTime.format("MMM DD YYYY");
  }

  getDaysRemaining(event: Event) {
    let currentDate = new Date();
    currentDate.setHours(23);
    currentDate.setMinutes(59);
    currentDate.setSeconds(59);
    currentDate.setMilliseconds(999);

    let eventStartDate = new Date(event.startDateTime);
    eventStartDate.setHours(23);
    eventStartDate.setMinutes(59);
    eventStartDate.setSeconds(59);
    eventStartDate.setMilliseconds(999);

    if((eventStartDate.getDay() - currentDate.getDay()) >= 0) {
      let timeDiff = Math.abs(eventStartDate.getTime() - currentDate.getTime());
      let daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      return (daysRemaining + " days left");
    } else {
      return "Event Over";
    }
  }

  getEventLocationShortFormat(event: Event) {
    if(event.country.toLowerCase() === "united states") {
      return (event.city + ", " + event.state);
    } else {
      return (event.city + ", " + event.country);
    }
  }

  followSpotify(artistSpotifyLink: string) {
    console.log("Following artist " + artistSpotifyLink);
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
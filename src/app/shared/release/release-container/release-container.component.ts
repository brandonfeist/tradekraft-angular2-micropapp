import { AppSettings } from 'app/app-settings';
import { Component, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Release } from './../../../model/release';

@Component({
  selector: 'release-container',
  templateUrl: './release-container.component.html'
})
export class ReleaseContainerComponent {
  @Input() release: Release;

  private defaultImage = AppSettings.loadImage;
  private errorImage = AppSettings.errorImage;
  private lazyLoadOffset = AppSettings.lazyLoadOffest;

  constructor() { }

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
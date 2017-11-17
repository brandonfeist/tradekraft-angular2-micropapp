import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { ReleaseService } from './../../../services/release.service';
import { Release } from './../../../model/release';

@Component({
  selector: 'release-preview',
  templateUrl: './release-preview.component.html'
})
export class ReleasePreviewComponent implements OnInit {
  releases: Release[] = [];
  defaultImage = "assets/images/preload-image.jpg";
  errorImage = "assets/images/error-image.jpg";

  constructor(private releaseService: ReleaseService) { }

  ngOnInit() {
    this.releaseService.getReleases(new URLSearchParams("pageSize=8")).subscribe(data => {
      this.releases = data.content;
    },
      err => {
        console.log("error", err);
      });
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
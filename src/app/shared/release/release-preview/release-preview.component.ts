import { SpinnerService } from 'app/services/spinner.service';
import { AppSettings } from 'app/app-settings';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { ReleaseService } from './../../../services/release.service';
import { Release } from './../../../model/release';

@Component({
  selector: 'release-preview',
  templateUrl: './release-preview.component.html'
})
export class ReleasePreviewComponent implements OnInit {
  private releases: Release[] = [];

  private defaultImage = AppSettings.loadImage;
  private errorImage = AppSettings.errorImage;
  private lazyLoadOffset = AppSettings.lazyLoadOffest;

  private releasePreviewSpinnerName: string = "releasePreviewSpinner";
  private loading: boolean = true;

  constructor(private releaseService: ReleaseService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.show(this.releasePreviewSpinnerName);

    this.releaseService.getReleases(new URLSearchParams("pageSize=4")).subscribe(data => {
      this.releases = data.content;

      this.spinnerService.hide(this.releasePreviewSpinnerName);
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

  private hasReleases(): boolean {
    return (this.releases && this.releases.length > 0);
  }
}
import { Artist } from './../../../artist/artist';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material';

import { SpotifyService } from './../../../services/spotify.service';

@Component({
  selector: 'artist-spotify-dialog',
  templateUrl: 'artist-spotify.component.html',
})
export class ArtistSpotifyDialog {
  private artist: Artist;
  private loading: boolean = true;
  private connectButton = false;
  private followButton = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.artist = this.data.artist;

    this.spotifyService.isLoggedIn().subscribe(data => {
      if(data.email) {
        this.followButton = true;
      } else {
        this.connectButton = true;
      }

      this.loading = false;
    },
    err => {
      console.log("error", err);
      
      this.connectButton = true;
      this.loading = false;
    });
  }
}
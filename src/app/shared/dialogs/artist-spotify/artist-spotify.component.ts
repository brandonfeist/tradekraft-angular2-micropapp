import { Artist } from './../../../artist/artist';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { SpotifyService } from './../../../services/spotify.service';

@Component({
  selector: 'artist-spotify-dialog',
  templateUrl: 'artist-spotify.component.html',
})
export class ArtistSpotifyDialog {
  private artist: Artist;
  private loading: boolean = true;
  private connectButton:boolean = false;
  private followButton:boolean = false;
  private unfollowButton:boolean = false;
  private showErrorMessage:boolean = false;
  private errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ArtistSpotifyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.artist = this.data.artist;

    this.checkIfConnectedToSpotify();
  }

  checkIfConnectedToSpotify() {
    this.spotifyService.isLoggedIn().subscribe(data => {
      if(data.email) {
        this.checkIfFollowingArtist()
      } else {
        this.connectButton = true;
        this.loading = false;
      }
    },
    err => {
      console.log("error", err);

      this.connectButton = true;
      this.loading = false;
    });
  }

  checkIfFollowingArtist() {
    this.spotifyService.isFollowingArtist(this.artist.spotify).subscribe(isFollowing => {
      if(isFollowing[0]) {
        this.unfollowButton = true;
      } else {
        this.followButton = true;
      }

      this.loading = false;
    },
    err => {
      console.log("error", err);
      
      this.loading = false;
      this.errorMessage = "There was a problem with Spotify :("
      this.showErrorMessage = true;
    });
  }

  followArtist() {
    this.spotifyService.followArtist(this.artist.spotify).subscribe(followed => {
      this.closeDialog();
    },
    err => {
      console.log("error", err);

      this.errorMessage = "There was a problem following" + this.artist.name + " :("
      this.showErrorMessage = true;
    });
  }

  unfollowArtist() {
    this.spotifyService.unfollowArtist(this.artist.spotify).subscribe(unfollowed => {
      this.closeDialog();
    },
    err => {
      console.log("error", err);

      this.errorMessage = "There was a problem unfollowing" + this.artist.name + " :("
      this.showErrorMessage = true;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
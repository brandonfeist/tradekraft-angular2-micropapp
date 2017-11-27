import { SnackbarService } from 'app/services/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { SpotifyService } from './../../../services/spotify.service';
import { Release } from 'app/model/release';

import * as _ from "lodash";

@Component({
  selector: 'playlist-spotify-dialog',
  templateUrl: 'playlist-spotify.component.html',
})
export class PlaylistSpotifyDialog {
  private release: Release;
  private playlists: Object[];
  private loading: boolean = true;
  private connectButton:boolean = false;
  private showPlaylists: boolean = false;
  private showErrorMessage:boolean = false;
  private errorMessage: string;

  private playlistForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<PlaylistSpotifyDialog>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private spotifyService: SpotifyService,
    private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.release = this.data.release;

    this.createForm()

    this.checkIfConnectedToSpotify();
  }

  createForm() {
    this.playlistForm = this.formBuilder.group({
      playlist: undefined
    });
  }

  onSubmit(): void {
    let playlistName = this.playlistForm.get("playlist").value;

    this.createPlaylistThenAddRelease(playlistName);
  }

  checkIfConnectedToSpotify() {
    // If token doesnt exist in localstorage, dont even check is logged in, just show connect button
    if(this.spotifyService.hasSpotifyAuthToken()) {
      this.spotifyService.getUserInfo().subscribe(data => {
        if(data.email) {
          this.getUsersPlaylists();
        } else {
          this.connectButton = true;
          this.loading = false;
        }
      },
      err => {
        // Check if token exists first on localStorage and then try to use refreshToken if token is invalid
        this.spotifyService.resfreshSpotifyToken().subscribe(data => {
          localStorage.setItem("tradekraft.spotify.access", JSON.stringify(data));
          this.getUsersPlaylists();
        }, err => {
          this.connectButton = true;
          this.loading = false;
        });
      });
    } else {
      this.connectButton = true;
      this.loading = false;
    }
  }

  getUsersPlaylists() {
    this.spotifyService.getUsersPlaylists().subscribe(playlistData => {
      this.playlists = playlistData.items;
      this.loading = false;
      this.showPlaylists = true;
    },
    err => {
      console.log("Playlist retrieval error.");
      this.displayErrorMessage("There was a problem getting your playlists.");
    });
  }

  createPlaylistThenAddRelease(playlistName: string) {
    this.spotifyService.getUserInfo().subscribe(userInfo => {
      let user = userInfo;

      this.spotifyService.getReleaseAlbum(this.release.spotify).subscribe(albumInfo => {
        let trackUris: string[] = this.getTrackUris(albumInfo.tracks.items);

        this.spotifyService.createPlaylist(user.id, playlistName).subscribe(playlistInfo => {
          this.spotifyService.addTracksToUserPlaylist(user.id, playlistInfo.id, trackUris).subscribe(response => {
            this.closeDialog();
            this.snackbarService.openSnackbar("Successfully added " + this.release.name + " to your playlist", "Close");
          }, err => {
            console.log("There was a problem adding to the spotify playlist, ", err);
            this.closeDialog();
            this.snackbarService.openSnackbar("There was a problem adding " + this.release.name + " to your playlist", "Close");
          });
        }, err => {
          console.log("There was a problem creating a new Spotify playlist, ", err);
          this.displayErrorMessage("There was a problem creating a new playlist")
        });
      }, err => {
        console.log("Problem getting album info from Spotify, ", err);
        this.displayErrorMessage("There was a problem getting the release info from Spotify.");
      });
    }, err => {
      console.log("Trouble getting user info from Spotify right now, ", err);
      this.displayErrorMessage("There was a problem with Spotify right now.");
    });
  }

  addToPlaylist(playlistId: string) {
    this.spotifyService.getUserInfo().subscribe(userInfo => {
      let user = userInfo;

      this.spotifyService.getReleaseAlbum(this.release.spotify).subscribe(albumInfo => {
        let trackUris: string[] = this.getTrackUris(albumInfo.tracks.items);

        this.spotifyService.addTracksToUserPlaylist(user.id, playlistId, trackUris).subscribe(response => {
          this.closeDialog();
          this.snackbarService.openSnackbar("Successfully added " + this.release.name + " to your playlist", "Close");
        }, err => {
          console.log("There was a problem adding to the spotify playlist, ", err);
          this.closeDialog();
          this.snackbarService.openSnackbar("There was a problem adding " + this.release.name + " to your playlist", "Close");
        });
      }, err => {
        console.log("Problem getting album info from Spotify, ", err);
        this.displayErrorMessage("There was a problem getting the release info from Spotify.");
      })
    }, err => {
      console.log("Trouble getting user info from Spotify right now, ", err);
      this.displayErrorMessage("There was a problem with Spotify right now.");
    });
  }

  private displayErrorMessage(message: string) {
    this.loading = false;
    this.errorMessage = message;
    this.showErrorMessage = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getTrackUris(tracks): string[] {
    let trackUris = new Array(tracks.length);

    for(let index = 0; index < tracks.length; index++) {
      trackUris[index] = tracks[index].uri;
    }

    return trackUris;
  }
}
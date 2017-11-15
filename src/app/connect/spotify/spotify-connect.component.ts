import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit }      from '@angular/core';

@Component({
  templateUrl: './spotify-connect.component.html'
  })
  export class SpotifyConnectComponent implements OnInit {
    
    constructor(private spotifyService: SpotifyService) {}

    ngOnInit() { 
      this.spotifyService.getAuthorizationCode();
    }
  }
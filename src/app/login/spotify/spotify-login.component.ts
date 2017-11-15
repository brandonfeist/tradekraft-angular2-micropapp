import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './spotify-login.component.html'
  })
  export class SpotifyLoginComponent implements OnInit {
    private paramSubscription: any;
    private spotifyAccessCode: string;
    
    constructor(private spotifyService: SpotifyService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() { 
      this.paramSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.spotifyAccessCode = params['code'];

        // Check params for code and state(optional)
        this.spotifyService.getSpotifyToken(this.spotifyAccessCode).subscribe(data => {
          localStorage.setItem("tradekraft.spotify.access", JSON.stringify(data));
          this.spotifyService.isAuthenticatedToSpotify = true;

          this.redirect();
        },
        err => {
          console.log("error", err);
          
          this.redirect();
        });
      });
    }

    ngOnDestroy() {
      this.paramSubscription.unsubscribe();
    }

    redirect() {
      if(localStorage.getItem("tradekraft.redirect.referurl")) {
        this.router.navigate([localStorage.getItem("tradekraft.redirect.referurl")]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
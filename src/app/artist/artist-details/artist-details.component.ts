import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { ArtistService } from './../artist.service';
import { Artist } from './../artist';

@Component({
  templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit {
  private artistSlug: string;
  private paramSubscription: any;
  private artist: Artist;

  constructor(private artistService: ArtistService, private activatedRoute: ActivatedRoute,
    private router: ActivatedRoute) { }

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.artistSlug = params['slug']);

    this.artist = this.router.snapshot.data['artist'];
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Release } from './release';
import { ReleaseService } from './../services/release.service';

@Component({
  selector: 'releases',
  templateUrl: './release.component.html'
})
export class ReleaseComponent implements OnInit {
  subscription;
  releaseSearchQuery: string;

  releases: Release[] = [];
  defaultImage: string = "assets/images/preload-image.jpg";
  errorImage: string = "assets/images/error-image.jpg";
  releaseSearchForm: FormGroup;

  constructor(private releaseService: ReleaseService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { 
    this.getQueryParams();

    this.createForm();

    this.onChanges();

    this.getReleases();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getReleases(): void {
    this.releaseService.getReleases(new URLSearchParams(this.getQueryString())).subscribe(data => {
      this.releases = data.content;
    },
    err => {
      console.log("error", err);
    });
  }

  getQueryParams(): void {
    this.subscription = this.route
    .queryParams
    .subscribe(params => {
    //   this.yearQuery = params['year'];
    //   this.artistSearchQuery = params['search'];
    });

    this.subscription.unsubscribe();
  }

  getQueryString(): string {
    let query: string;

    return query
  }

  createForm(): void {
    this.releaseSearchForm = this.formBuilder.group({
      search: this.releaseSearchQuery || ''
    });
  }

  onSubmit(): void {
    this.router.navigate(['artists'], { queryParams: { 
      search: this.releaseSearchForm.get("search").value} 
    });

    this.releaseSearchQuery = this.releaseSearchForm.get("search").value;
    
    this.getReleases();
  }

  onChanges(): void {

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
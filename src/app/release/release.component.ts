import { AppSettings } from 'app/app-settings';
import { SnackbarService } from './../services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Release } from './../model/release';
import { ReleaseService } from './../services/release.service';
import { Genre } from 'app/model/genre';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'releases',
  templateUrl: './release.component.html'
})
export class ReleaseComponent implements OnInit {
  private subscription;
  private releaseSearchQuery: string;
  private releaseGenreQuery: string;
  private releaseTypeQuery: string;

  private releases: Release[] = [];
  private releaseTypes: Object[];
  private genres: Genre[];

  private defaultImage: string = AppSettings.loadImage;
  private errorImage: string = AppSettings.errorImage;
  private lazyLoadOffset: number = AppSettings.lazyLoadOffest;
  private releaseSearchForm: FormGroup;

  private currentPage: number = 0;
  private loadingInfScroll: boolean = false;
  private spinnerName: string = 'releaseIndexSpinner';

  constructor(private releaseService: ReleaseService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService, private spinnerService: SpinnerService) { 
      this.releaseTypes = [
        { type: "EP" },
        { type: "LP" },
        { type: "Single" }
      ]
    }

  ngOnInit() { 
    this.genres = this.activatedRoute.snapshot.data['genres'].content;

    this.getQueryParams();

    this.createForm();

    this.onChanges();

    this.getReleases();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getReleases() {
    if(!this.loadingInfScroll) {
      this.loadingInfScroll = true;
      this.spinnerService.show(this.spinnerName);

      let urlSearchParams = new URLSearchParams(this.getQueryString());
      urlSearchParams.append('page', this.currentPage.toString());

      this.releaseService.getReleases(urlSearchParams).subscribe(data => {
        this.spinnerService.hide(this.spinnerName);

        if(this.currentPage > 0) {
          this.releases = this.releases.concat(data.content);
        } else {
          this.releases = data.content;
        }

        if(data.content.length > 0) {
          this.currentPage++;
        }
      },
      err => {
        this.spinnerService.hide(this.spinnerName);

        console.log("error", err);
        this.snackbarService.openSnackbar("There was a problem getting the releases.");
      });
    }
  }

  private getQueryParams(): void {
    this.subscription = this.route
    .queryParams
    .subscribe(params => {
      this.releaseSearchQuery = params['search'];
      this.releaseGenreQuery = params['genre'];
      this.releaseTypeQuery = params['type'];
    });

    this.subscription.unsubscribe();
  }

  private getQueryString(): string {
    let query: string;
    
    if(this.releaseSearchQuery) {
      query = "search=" + this.releaseSearchQuery;
    }

    if(this.releaseGenreQuery) {
      if(query) {
        query += "&genre=" + this.releaseGenreQuery;
      } else {
        query = "genre=" + this.releaseGenreQuery;
      }
    }

    if(this.releaseTypeQuery) {
      if(query) {
        query += "&type=" + this.releaseTypeQuery;
      } else {
        query = "type=" + this.releaseTypeQuery;
      }
    }

    return query
  }

  private createForm(): void {
    this.releaseSearchForm = this.formBuilder.group({
      search: this.releaseSearchQuery || null,
      genre: this.releaseGenreQuery || null,
      type: this.releaseTypeQuery || null
    });
  }

  private onSubmit(): void {
    this.currentPage = 0;

    this.router.navigate(['releases'], { queryParams: { 
        search: this.releaseSearchForm.get("search").value,
        genre: this.releaseSearchForm.get("genre").value,
        type: this.releaseSearchForm.get("type").value
      }
    });

    this.releaseSearchQuery = this.releaseSearchForm.get("search").value;
    this.releaseGenreQuery = this.releaseSearchForm.get("genre").value;
    this.releaseTypeQuery = this.releaseSearchForm.get("type").value;

    this.releases = [];
    
    this.getReleases();

    window.scrollTo(0, 1);
  }

  private onChanges(): void {
    this.releaseSearchForm.get('genre').valueChanges.subscribe(val => {
      this.onSubmit();
    });

    this.releaseSearchForm.get('type').valueChanges.subscribe(val => {
      this.onSubmit();
    });
  }

  private formatReleaseArtists(release): string {
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
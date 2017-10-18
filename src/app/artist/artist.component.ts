import { ArtistService } from './artist.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Artist } from './artist';

@Component({
  selector: 'artists',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  subscription;
  yearQuery: string;
  artistSearchQuery: string;

  artists: Artist[] = [];
  defaultImage: string = "assets/images/preload-image.jpg";
  errorImage: string = "assets/images/error-image.jpg";
  artistSearchForm: FormGroup;
  years = [{value: 0, name: "Year"},
          {value: 2016, name: "2016"},
          {value: 2017, name: "2017"}];

  constructor(private artistService: ArtistService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { 
    this.getQueryParams();

    this.createForm();

    this.onChanges();

    this.getArtists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArtists(): void {
    this.artistService.getArtists(new URLSearchParams(this.getQueryString())).subscribe(data => {
      this.artists = data.content;
    },
    err => {
      console.log("error", err);
    });
  }

  getQueryParams(): void {
    this.subscription = this.route
    .queryParams
    .subscribe(params => {
      this.yearQuery = params['year'];
      this.artistSearchQuery = params['search'];
    });

    this.subscription.unsubscribe();
  }

  getQueryString(): string {
    let query: string;

    if(this.yearQuery) {
      query = "yearQuery=" + this.yearQuery;
    }

    if(this.artistSearchQuery) {
      if(query) {
        query += "&artistQuery=" + this.artistSearchQuery;
      } else {
        query = "artistQuery=" + this.artistSearchQuery;
      }
    }

    return query
  }

  createForm(): void {
    this.artistSearchForm = this.formBuilder.group({
      search: this.artistSearchQuery || '',
      year: this.findYearByValue(this.yearQuery) || this.years[0].value
    });
  }

  onSubmit(): void {
    let formmatedYear = this.artistSearchForm.get("year").value != 0 ? this.artistSearchForm.get("year").value : '';

    this.router.navigate(['artists'], { queryParams: { 
      search: this.artistSearchForm.get("search").value,
      year: formmatedYear} 
    });

    this.yearQuery = formmatedYear;
    this.artistSearchQuery = this.artistSearchForm.get("search").value;
    
    this.getArtists();
  }

  onChanges(): void {
    this.artistSearchForm.get('year').valueChanges.subscribe(val => {
      this.onSubmit();
    });
  }

  findYearByValue(value): number {
    for(let year of this.years) {
      if(year.value == value) {
        return year.value;
      }
    }

    return undefined;
  }
}
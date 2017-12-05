import { ArtistService } from './artist.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Artist } from './../model/artist';
import { YearService } from 'app/services/year.service';

@Component({
  selector: 'artists',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  private subscription;
  private yearQuery: string;
  private artistSearchQuery: string;

  private artists: Artist[] = [];
  private defaultImage: string = "assets/images/preload-image.jpg";
  private errorImage: string = "assets/images/error-image.jpg";
  private artistSearchForm: FormGroup;
  private years;

  constructor(private artistService: ArtistService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private yearService: YearService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { 
    this.years = this.activatedRoute.snapshot.data['years'];

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

    if(this.artistSearchForm.get("year").value) {
      query = "yearQuery=" + this.artistSearchForm.get("year").value;
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
      search: this.artistSearchQuery || null,
      year: this.years[0].year || null
    });
  }

  onSubmit(): void {
    let formmatedYear = this.artistSearchForm.get("year").value;

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
}
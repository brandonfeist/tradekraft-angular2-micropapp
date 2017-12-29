import { SnackbarService } from 'app/services/snackbar.service';
import { Artist } from 'app/model/artist';
import { ArtistService } from './../../artist/artist.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './admin-artist.component.html'
})
export class AdminArtistComponent implements OnInit {

  private artists: Artist[];

  private dataSource;

  private displayedColumns = ['', 'name', 'actions'];

  private defaultImage: string = "assets/images/preload-image.jpg";

  private errorImage: string = "assets/images/error-image.jpg";

  constructor(private artistService: ArtistService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getAllArtists();
  }

  ngOnDestroy() {}

  private getAllArtists() {
    this.artistService.getArtists().subscribe((artists) => {
      this.artists = artists.content;
      this.dataSource = new MatTableDataSource<Artist>(this.artists);
    }, err => {
      console.log("Artist get error, ", err);
      this.snackbarService.openSnackbar("There was a problem getting the artists.");
    })
  }

  private deleteArtist(artist: Artist) {
    
  }
}
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { Genre } from 'app/model/genre';
import { GenreService } from 'app/services/genre.service';

@Component({
  templateUrl: './admin-genre.component.html'
})
export class AdminGenreComponent implements OnInit {

  private loading: boolean = true;

  private genres: Genre[];

  private dataSource;

  private displayedColumns = ['', 'name', 'actions'];

  constructor(private genreService: GenreService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getAllGenres();
  }

  ngOnDestroy() {}

  private getAllGenres() {
    this.genreService.getGenres().subscribe((genres) => {
      this.loading = false;
      
      this.genres = genres.content;
      this.dataSource = new MatTableDataSource<Genre>(this.genres);
    }, err => {
      console.log("Genre get error, ", err);
      this.snackbarService.openSnackbar("There was a problem getting the genres.");

      this.loading = false;
    })
  }

  private deleteGenre(genre: Genre) {
    if(confirm("Are you sure you want to delete " + genre.name + "?")) {
      this.genreService.deleteGenre(genre.id).subscribe((data) => {
        console.log("Genre deleted: ", data);

        for(let genreIndex = 0; genreIndex < this.genres.length; genreIndex++) {
          if(genre.id === this.genres[genreIndex].id) {
            this.genres.splice(genreIndex, 1);
          }
        }

        this.dataSource = new MatTableDataSource<Genre>(this.genres);

        this.snackbarService.openSnackbar(genre.name + " deleted.");
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem deleting " + genre.name + ".");
      });
    }
  }
}
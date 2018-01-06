import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';
import { GenreService } from 'app/services/genre.service';

@Component({
  templateUrl: './admin-create-genre.component.html'
})
export class AdminCreateGenreComponent implements OnInit {
  private genreCreateForm: FormGroup;

  private processing: boolean = false;

  constructor(private genreService: GenreService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  private createForm() {
    this.genreCreateForm = this.formBuilder.group({
      name: null,
      color: null
    });
  }

  private onSubmit() {
    this.processing = true;

    this.genreService.createGenre(this.genreCreateForm.value).subscribe(genre => {
        this.snackbarService.openSnackbar("Created genre " + genre.name, "close");
        this.router.navigate(['admin/genres']);
    }, err => {
      console.log("err: ", err);

      if(err._body) {
        this.snackbarService.openSnackbar("Genre Create Error: " + JSON.parse(err._body).error, "close", 4000);
      } else {
        this.snackbarService.openSnackbar("Genre creation error.", "close", 4000);
      }

      this.processing = false;
    });
  }
}
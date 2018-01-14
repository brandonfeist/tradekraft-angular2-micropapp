import { Genre } from './../../model/genre';
import { AppSettings } from 'app/app-settings';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';
import { GenreService } from 'app/services/genre.service';

@Component({
  templateUrl: './admin-edit-genre.component.html'
})
export class AdminEditGenreComponent implements OnInit {
  private genreEditForm: FormGroup;

  private processing: boolean = false;

  private genre: Genre;

  private genreId: number;

  private paramSubscription: any;

  constructor(private snackbarService: SnackbarService, private formBuilder: FormBuilder, 
    private router: Router, private activatedRoute: ActivatedRoute, private genreService: GenreService) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.genreId = params['id']);

    this.genre = this.activatedRoute.snapshot.data['genre'];

    this.createForm();
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private createForm() {
    this.genreEditForm = this.formBuilder.group({
      name: this.genre.name,
      color: this.genre.color
    });
  }

  private getJsonPatches(): Object[] {
    let patches = [];

    for(let key in this.genreEditForm.controls) {
      if((this.genreEditForm.controls[key].touched || this.genreEditForm.controls[key].dirty)) {
        patches.push({op: "replace", path:"/" + key, value: this.genreEditForm.controls[key].value});
      }
    }

    return patches;
  }

  private onSubmit() {
    this.processing = true;

    let patches = this.getJsonPatches();

    if(this.genreEditForm.touched || this.genreEditForm.dirty) {
      this.genreService.editGenre(this.genre.id, patches).subscribe((genre) => {
        this.snackbarService.openSnackbar("Edited genre " + genre.name);
        this.router.navigate(['admin/genres']);

      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an error editing the genre.");

        this.processing = false;
      })
    } else {
      this.snackbarService.openSnackbar("No edits made to " + this.genre.name);
      this.router.navigate(['admin/genres']);
    }
  }
}
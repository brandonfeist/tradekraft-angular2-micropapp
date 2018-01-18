import { Genre } from './../../model/genre';
import { CreateSongDialog } from './../../shared/dialogs/create-song/create-song.component';
import { ReleaseService } from 'app/services/release.service';
import { AppSettings } from 'app/app-settings';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource, MatDialog } from '@angular/material';
import * as moment from 'moment-timezone';
import { Artist } from 'app/model/artist';
import { FormControl } from '@angular/forms/src/model';
import { Song } from 'app/model/song';
import { TrackNumberValidation } from 'app/validators/track-number-validation';

@Component({
  templateUrl: './admin-create-release.component.html'
})
export class AdminCreateReleaseComponent implements OnInit {
  private releaseCreateForm: FormGroup;

  private releaseInfoCreateForm: FormGroup;

  private releaseLinksCreateForm: FormGroup;

  private releaseSongsCreateForm: FormGroup;

  private processing: boolean = false;

  private imageFile: File;

  private releaseTypes = ['EP', 'LP', 'Single'];

  private displayedColumns = ['track', 'name', 'actions'];

  private artists: Artist[];

  private genres: Genre[];

  private songs;

  constructor(private releaseService: ReleaseService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {    
    this.createForm();

    this.artists = this.activatedRoute.snapshot.data['artists'];

    this.genres = this.activatedRoute.snapshot.data['genres'];
  }

  ngOnDestroy() {}

  private createForm() {
    this.releaseInfoCreateForm = this.formBuilder.group({
      name: null,
      images: null,
      description: null,
      releaseType: this.releaseTypes[0],
      releaseDate: new Date(),
      freeRelease: false
    });

    this.releaseLinksCreateForm = this.formBuilder.group({
      soundcloud: null,
      spotify: null,
      itunes: null,
      appleMusic: null,
      googlePlay: null,
      amazon: null,
    });
    
    this.releaseSongsCreateForm = this.formBuilder.group({
      songs: [null, Validators.required]
    }, {
      validator: TrackNumberValidation.TrackNumber
    });
  }

  private keyupHandlerFunction(event) {
    this.releaseInfoCreateForm.get('description').setValue(event);
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.imageFile = fileList[0]
      this.releaseInfoCreateForm.get('images').setValue(this.imageFile.name);
    }
  }

  private removeImageFile() {
    this.imageFile = undefined;

    this.releaseInfoCreateForm.get('images').setValue(null);
  }

  private openCreateSongDialog() {
    let dialogRef = this.dialog.open(CreateSongDialog, {
      data: { 
        artists: this.artists,
        genres: this.genres
      }
    });

    const sub = dialogRef.componentInstance.submit.subscribe((songData) => {
      if(this.releaseSongsCreateForm.value.songs == null) {
        this.releaseSongsCreateForm.patchValue({ songs: [songData]});
      } else {
        let currentSongs = this.releaseSongsCreateForm.value.songs;

        currentSongs.push(songData);

        this.releaseSongsCreateForm.patchValue({ songs: currentSongs});
      }

      this.songs = new MatTableDataSource<Song>(this.releaseSongsCreateForm.value.songs);
    });
  }

  private deleteSong(song: Song, index: number) {
    if(confirm("Are you sure you want to remove " + song.name + "?")) {
      let currentSongs = this.releaseSongsCreateForm.value.songs;

      currentSongs.splice(index, 1);

      this.releaseSongsCreateForm.patchValue({ songs: currentSongs});

      this.songs = new MatTableDataSource<Song>(this.releaseSongsCreateForm.value.songs);
    }
  }

  private onSubmit() {
    console.log("Submit");
  //   this.processing = true;

  //   this.artistCreateForm.get('images').setValue(null);

  //   this.artistService.createArtist(this.artistCreateForm.value).subscribe(artist => {
  //     this.artistService.uploadArtistImage(artist.slug, this.imageFile).subscribe(data => {
  //       this.snackbarService.openSnackbar("Created artist " + artist.name);
  //       this.router.navigate(['admin/artists']);
  //     }, err => {
  //       console.log("err: ", err);
  //       this.snackbarService.openSnackbar("There was an problem uploading the artist image.");
        
  //       this.processing = false;
  //     });
  //   }, err => {
  //     console.log("err: ", err);
  //     this.snackbarService.openSnackbar("Artist Create Error: " + JSON.parse(err._body).error, undefined, 5000);

  //     this.processing = false;
  //   });
  }
}
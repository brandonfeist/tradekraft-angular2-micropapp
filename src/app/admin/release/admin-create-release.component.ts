import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Release } from './../../model/release';
import { Observable } from 'rxjs/Rx';
import { SongService } from './../../services/song.service';
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

  private imageUploadProgress: number = 0;

  private imageFile;

  private releaseTypes = ['EP', 'LP', 'Single'];

  private displayedColumns = ['track', 'name', 'actions'];

  private artists: Artist[];

  private genres: Genre[];

  private songs;

  constructor(private releaseService: ReleaseService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private songService: SongService, private http: HttpClient) {}

  ngOnInit() {    
    this.createForm();

    this.artists = this.activatedRoute.snapshot.data['artists'];

    this.genres = this.activatedRoute.snapshot.data['genres'];
  }

  ngOnDestroy() {}

  private createForm() {
    this.releaseInfoCreateForm = this.formBuilder.group({
      name: null,
      image: null,
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
    this.removeImageFile();

    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.http.request(this.releaseService.uploadReleaseImage(fileList[0])).subscribe(imageResponse => {
        if(imageResponse.type === HttpEventType.UploadProgress) {
          this.imageUploadProgress = Math.round(100 * imageResponse.loaded / imageResponse.total);
        } else if (imageResponse instanceof HttpResponse) {
          this.releaseInfoCreateForm.get('image').setValue(imageResponse.body);
          this.imageFile = imageResponse.body;
        }
      }, err => {
        console.log("image upload err: ", err);
        this.snackbarService.openSnackbar("There was an problem uploading the release image.");
      });
    }
  }

  private removeImageFile() {
    this.imageFile = undefined;

    this.releaseInfoCreateForm.get('image').setValue(null);
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

  private uploadSongAndSongFiles(release: Release) {
    let songsAndSongFiles = this.releaseSongsCreateForm.value.songs;

    let songFilePromises = [];
    for(let songFileIndex = 0; songFileIndex < songsAndSongFiles.length; songFileIndex++) {
      songFilePromises.push(
        this.songService.uploadSongFile(songsAndSongFiles[songFileIndex].songFile)
      );
    }

    Observable.forkJoin(songFilePromises).subscribe(songFiles => {
      let songs = [];
      for(let songIndex = 0; songIndex < songsAndSongFiles.length; songIndex++) {
        songsAndSongFiles[songIndex].song.songFile = songFiles[songIndex];
        songsAndSongFiles[songIndex].song.release = release;
        songs.push(songsAndSongFiles[songIndex].song);
      }

      this.songService.createSongs(songs).subscribe(songRes => {
        this.snackbarService.openSnackbar("Release and songs uploaded.");
        this.router.navigate(['admin/releases']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem creating the songs.");

        this.processing = false;
      })
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("There was a problem uploading the song files.");

      this.processing = false;
    })
  }

  private onSubmit() {
    this.processing = true;

    let release = Object.assign({}, this.releaseInfoCreateForm.value, this.releaseLinksCreateForm.value);

    this.releaseService.createRelease(release).subscribe(release => {
      this.uploadSongAndSongFiles(release);
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("There was a problem creating the release.");

      this.processing = false;
    });
  }
}
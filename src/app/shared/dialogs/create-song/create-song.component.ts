import { Genre } from 'app/model/genre';
import { Artist } from 'app/model/artist';
import { SnackbarService } from 'app/services/snackbar.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'create-song-dialog',
  templateUrl: 'create-song.component.html',
})
export class CreateSongDialog {

  @Output() submit = new EventEmitter<any>(true);

  private createSong: FormGroup;

  private songFile: File;

  private artists: Artist[] = [];

  private genres: Genre[] = [];

  constructor(public dialogRef: MatDialogRef<CreateSongDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbarService: SnackbarService,
      private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.artists = this.data.artists.content;

    this.genres = this.data.genres.content;
    
    this.createSongForm();
  }

  private createSongForm() {
    this.createSong = this.formBuilder.group({
      name: null,
      songFiles: null,
      trackNumber: null,
      bpm: null,
      artists: null,
      genre: null
    });
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.songFile = fileList[0]
      this.createSong.get('songFiles').setValue(this.songFile.name);
    }
  }

  removeSongFile() {
    this.songFile = undefined;

    this.createSong.get('songFiles').setValue(null);
  }

  onSubmit() {
    this.createSong.get('songFiles').setValue(null);
    
    this.submit.emit({
      song: this.createSong.value,
      songFile: this.songFile
    });

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
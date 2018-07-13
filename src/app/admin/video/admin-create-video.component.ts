import { Song } from 'app/model/song';
import { AppSettings } from 'app/app-settings';
import { RegexValidation } from './../../validators/regex-validation';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';
import { VideoService } from 'app/services/video.service';
import { Observable} from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { VideoPreviewRangeValidation } from 'app/validators/video-preview-range-validation';

@Component({
  templateUrl: './admin-create-video.component.html'
})
export class AdminCreateVideoComponent implements OnInit {
  private videoCreateForm: FormGroup;

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  private processing: boolean = false;

  private videoFile: File;

  private songs: Song[] = [];

  private filteredOptions: Observable<Song[]>;

  private minRange = 0;

  private maxRange = 100;

  private filter(songName: string): Song[] {
    return this.songs.filter(song =>
      song.name.toLowerCase().indexOf(songName.toLowerCase()) === 0);
  }

  constructor(private videoService: VideoService, private snackbarService: SnackbarService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,) {}

  ngOnInit() {
    this.songs = this.activatedRoute.snapshot.data['songs'].content;

    this.createForm();

    this.filteredOptions = this.videoCreateForm.get('song').valueChanges
      .pipe(
        startWith<string | Song>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.songs.slice())
      );
  }

  private displayFn(song?: Song): string | undefined {
    return song ? song.name : undefined;
  }

  private createForm() {
    this.videoCreateForm = this.formBuilder.group({
      name: null,
      videoFiles: null,
      externalUrl: null,
      featured: false,
      range: null,
      song: null
    }, {
      validator: VideoPreviewRangeValidation.PreviewRange
    });
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
      this.videoFile = fileList[0]
      this.videoCreateForm.get('videoFiles').setValue(this.videoFile.name);
    }

    let video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      let duration = Math.round(video.duration - 10);

      this.maxRange = duration;

      this.videoCreateForm.get('range').setValue([0, duration]);
    }
    video.src = URL.createObjectURL(fileList[0]);
  }

  private getRange() {
    let range = this.videoCreateForm.get('range').value
    if(range) {
      let range1 = new Date(null);
      range1.setSeconds(range[0]);

      let range2 = new Date(null);
      range2.setSeconds(range[1]);

      return "[" + (range1.toISOString().substr(11, 8) + ", " + range2.toISOString().substr(11, 8)) + "]";
    }

    return undefined;
  }

  removeVideoFile() {
    this.videoFile = undefined;

    this.videoCreateForm.get('videoFiles').setValue(null);

    this.videoCreateForm.get('range').setValue(null);
  }

  private onSubmit() {
    this.processing = true;

    let range = this.videoCreateForm.get('range').value;

    let videoData = this.videoCreateForm.value;

    delete videoData.range;

    videoData.videoFiles = null;

    this.videoService.createVideo(videoData).subscribe(video => {
      this.videoService.uploadVideoFile(video.slug, this.videoFile, range[0], range[1]).subscribe(videoFile => {
        this.snackbarService.openSnackbar("Created video " + video.name);
        this.router.navigate(['admin/videos']);
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was an problem uploading the video file.");

        this.processing = false;
      });
    }, err => {
      console.log("err: ", err);
      this.snackbarService.openSnackbar("There was a problem creating the video.");

      this.processing = false;
    });
  }
}
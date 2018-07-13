import { AppSettings } from 'app/app-settings';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { VideoService } from 'app/services/video.service';

@Component({
  templateUrl: './admin-video.component.html'
})
export class AdminVideoComponent implements OnInit {

  private loading: boolean = true;

  private dataSource;

  private videos = [];
  
  private deleting = [];

  private displayedColumns = ['', 'name', 'actions'];

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  constructor(private videoService: VideoService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getAllVideos();
  }

  private getImage(object, imageName: string) {
    if(object.videoThumbnails && object.videoThumbnails[imageName]) {
      return object.videoThumbnails[imageName].link;
    }

    return undefined;
  }

  private getAllVideos() {
    this.videoService.getVideos().subscribe((videos) => {
      this.loading = false;
      
      this.videos = videos.content;
      this.dataSource = new MatTableDataSource<Object>(this.videos);
    }, err => {
      console.log("Video get error, ", err);
      this.snackbarService.openSnackbar("There was a problem getting the videos.");

      this.loading = false;
    });
  }

  private isDeletingVideo(video) {
    for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
      if(this.deleting[deleteIndex].slug === video.slug) {
        return true;
      }
    }
  }

  private deleteVideo(video) {
    if(confirm("Are you sure you want to delete " + video.name + "?")) {
      this.deleting.push({ slug: video.slug });
      
      this.videoService.deleteVideo(video.slug).subscribe((data) => {
        for(let videoIndex = 0; videoIndex < this.videos.length; videoIndex++) {
          if(video.slug === this.videos[videoIndex].slug) {
            this.videos.splice(videoIndex, 1);
          }
        }

        this.dataSource = new MatTableDataSource<Object>(this.videos);

        this.snackbarService.openSnackbar(video.name + " deleted.");
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem deleting " + video.name + ".");
      });
    }
  }
}
import { ImgService } from './../../shared/img-service/img-service';
import { Release } from 'app/model/release';
import { ReleaseService } from './../../services/release.service';
import { AppSettings } from 'app/app-settings';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './admin-release.component.html'
})
export class AdminReleaseComponent implements OnInit {

  private loading: boolean = true;

  private releases: Release[];

  private dataSource;
  
  private deleting = [];

  private displayedColumns = ['', 'name', 'actions'];

  private defaultImage: string = AppSettings.loadImage;

  private errorImage: string = AppSettings.errorImage;

  constructor(private releaseService: ReleaseService, private snackbarService: SnackbarService,
    private imgService: ImgService) {}

  ngOnInit() {
    this.getAllReleases();
  }
  
  private getAllReleases() {
    this.releaseService.getReleases().subscribe((releases) => {
      this.loading = false;
      
      this.releases = releases.content;
      this.dataSource = new MatTableDataSource<Release>(this.releases);
    }, err => {
      console.log("Release get error, ", err);
      this.snackbarService.openSnackbar("There was a problem getting the releases.");

      this.loading = false;
    })
  }

  private isDeletingRelease(release: Release) {
    for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
      if(this.deleting[deleteIndex].slug === release.slug) {
        return true;
      }
    }
  }

  private deleteRelease(release: Release) {
    if(confirm("Are you sure you want to delete " + release.name + "?")) {
      this.deleting.push({ slug: release.slug });

      this.releaseService.deleteRelease(release.slug).subscribe((data) => {
        for(let releaseIndex = 0; releaseIndex < this.releases.length; releaseIndex++) {
          if(release.slug === this.releases[releaseIndex].slug) {
            this.releases.splice(releaseIndex, 1);
          }
        }

        this.dataSource = new MatTableDataSource<Release>(this.releases);

        this.snackbarService.openSnackbar(release.name + " deleted.");
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem deleting " + release.name + ".");
      });
    }
  }
}
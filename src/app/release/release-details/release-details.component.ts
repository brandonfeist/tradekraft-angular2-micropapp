import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment-timezone';

import { Release } from './../release';
import { ReleaseService } from './../release.service';

@Component({
  templateUrl: './release-details.component.html'
})
export class ReleaseDetailsComponent implements OnInit {
  private releaseSlug: string;
  private paramSubscription: any;
  private release: Release;
  defaultImage: string = "assets/images/preload-image.jpg";
  errorImage: string = "assets/images/error-image.jpg";

  constructor(private releaseService: ReleaseService, private activatedRoute: ActivatedRoute,
    private router: ActivatedRoute) { }

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.releaseSlug = params['slug']);

    this.release = this.router.snapshot.data['release'];
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
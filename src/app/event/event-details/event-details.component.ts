import { AppSettings } from 'app/app-settings';
import { Component, OnInit, Inject }  from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment-timezone';
import { Event } from './../../model/event';

@Component({
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {
  private event: Event;
  private eventSlug: string;
  private paramSubscription: any;
  defaultImage: string =  AppSettings.loadImage;
  errorImage: string = AppSettings.errorImage;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, public dialog: MatDialog) {}

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.eventSlug = params['slug']);

    this.event = this.activatedRoute.snapshot.data['event'];
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
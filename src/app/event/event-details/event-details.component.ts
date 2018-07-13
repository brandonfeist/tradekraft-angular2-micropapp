import { AppSettings } from 'app/app-settings';
import { Component, OnInit, Inject }  from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment-timezone';
import { Event } from './../../model/event';
import { DateAbbr } from 'app/shared/date-abbr/date-abbr';

@Component({
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {
  private event: Event;
  private eventSlug: string;
  private paramSubscription: any;

  private defaultImage: string =  AppSettings.loadImage;
  private errorImage: string = AppSettings.errorImage;
  private lazyLoadOffset: number = AppSettings.lazyLoadOffest;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, public dialog: MatDialog, private dateAbbr: DateAbbr) {}

  ngOnInit() { 
    this.paramSubscription = this.activatedRoute.params.subscribe(params => this.eventSlug = params['slug']);

    this.event = this.activatedRoute.snapshot.data['event'];
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  private locationTitle(): string {
    return this.event.venueName + ": " + this.formatEventCity();
  }

  private formatEventCity(): string {
    if(this.event.country.toLowerCase() === 'united states') {
      return this.event.city + ", " + this.dateAbbr.abbrDate(this.event.state, 'abbr');
    }

    return this.event.city + ", " + this.event.country;
  }

  private formatDate(dateMilliseconds: number, format: string): string {
    return moment(dateMilliseconds).format(format);
  }

  private isUpcomingEvent() {
    return (this.event.startDateTime > Math.round((new Date()).getTime()));
  }

  private isPastEvent() {
    return (this.event.endDateTime < Math.round((new Date()).getTime()));
  }
}
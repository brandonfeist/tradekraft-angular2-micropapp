import { AppSettings } from 'app/app-settings';
import { Event } from './../../../model/event';
import { Component, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { DateAbbr } from './../../date-abbr/date-abbr';
import * as moment from 'moment-timezone';

@Component({
  selector: 'event-container',
  templateUrl: './event-container.component.html'
})
export class EventContainerComponent {
  @Input() event: Event;

  private defaultImage = AppSettings.loadImage;
  private errorImage = AppSettings.errorImage;
  private lazyLoadOffset = AppSettings.lazyLoadOffest;

  private MILLIS_IN_SECS = 1000;
  private SECS_IN_MINS = 60;
  private MINS_IN_HOURS = 60;
  private HOURS_IN_DAYS = 24;
  private MAX_DESCRIPTION_LENGTH = 250;

  constructor(private dateAbbr: DateAbbr) { }

  formatEventStartDateTime(event: Event) {
    let formatedStartDateTime = moment(event.startDateTime);

    return formatedStartDateTime.format("MMM DD YYYY");
  }

  processDescriptionPreview(event: Event) {
    if(event.description.length > this.MAX_DESCRIPTION_LENGTH) {
      return event.description.replace(/<(?:.|\n)*?>/gm, '').substring(0, this.MAX_DESCRIPTION_LENGTH) + '...';
    }

    return event.description;
  }

  getDaysRemaining(event: Event) {
    let currentDateMilli = (new Date()).getTime();

    let startDifference = event.startDateTime - currentDateMilli;
    let endDifference = event.endDateTime - currentDateMilli;

    let minsLeft = Math.floor(startDifference / this.MILLIS_IN_SECS / 
      this.SECS_IN_MINS);
    let hoursLeft = Math.floor(startDifference / this.MILLIS_IN_SECS / 
      this.SECS_IN_MINS / this.MINS_IN_HOURS);
    let daysLeft = Math.floor(startDifference / this.MILLIS_IN_SECS / 
      this.SECS_IN_MINS / this.MINS_IN_HOURS / this.HOURS_IN_DAYS);

    if(startDifference > 0) {
      if(daysLeft > 0) {
        if(daysLeft != 1) {
          return (daysLeft + " days left");
        } else {
          return (daysLeft + " day left");
        }
      } else if(hoursLeft > 0) {
        if(hoursLeft != 1) {
          return (hoursLeft + " hours left");
        } else {
          return (hoursLeft + " hour left");
        }
      } else {
        if(minsLeft != 1) {
          return (minsLeft + " minutes left");
        } else {
          return (minsLeft + " minute left");
        }
      }
    } else if(startDifference < 0 && endDifference > 0) {
      return "Event Started";
    } else {
      return "Event Over";
    }
  }

  getEventLocationShortFormat(event: Event) {
    if(event.country.toLowerCase() === "united states") {
      return (event.city + ", " + this.dateAbbr.abbrDate(event.state, 'abbr'));
    } else {
      return (event.city + ", " + event.country);
    }
  }
}
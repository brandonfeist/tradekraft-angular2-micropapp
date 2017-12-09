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
  @Input() shorter: boolean;
  @Input() noMargin: boolean = false;

  defaultImage = "assets/images/preload-image.jpg";
  errorImage = "assets/images/error-image.jpg";

  constructor(private dateAbbr: DateAbbr) { }

  formatEventStartDateTime(event: Event) {
    let formatedStartDateTime = moment(event.startDateTime);

    return formatedStartDateTime.format("MMM DD YYYY");
  }

  getDaysRemaining(event: Event) {
    let currentDate = new Date();
    currentDate.setHours(23);
    currentDate.setMinutes(59);
    currentDate.setSeconds(59);
    currentDate.setMilliseconds(999);

    let eventStartDate = new Date(event.startDateTime);
    eventStartDate.setHours(23);
    eventStartDate.setMinutes(59);
    eventStartDate.setSeconds(59);
    eventStartDate.setMilliseconds(999);

    if((eventStartDate.getDay() - currentDate.getDay()) >= 0) {
      let timeDiff = Math.abs(eventStartDate.getTime() - currentDate.getTime());
      let daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      return (daysRemaining + " days left");
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
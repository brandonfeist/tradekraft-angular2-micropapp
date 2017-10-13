import { Event } from './../event';
import { EventService } from './../event.service';
import { Component, OnInit }      from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
    selector: 'event-preview',
    templateUrl: './event-preview.component.html'
  })
  export class EventPreviewComponent implements OnInit {
    events: Event[] = [];

    constructor(private eventService: EventService) { }

    ngOnInit() { 
      this.eventService.getEvents(new URLSearchParams("pageSize=4")).subscribe(data => {
        this.events = data.content;
      },
      err => {
        console.log("error", err);
      });
    }

    getDaysRemaining(event: Event) {
      let currentDate = new Date();
      currentDate.setHours(23);
      currentDate.setMinutes(59);
      currentDate.setSeconds(59);
      currentDate.setMilliseconds(999);

      let eventStartDate = new Date(this.events[0].startDateTime);
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
        return (event.city + ", " + event.state);
      } else {
        return (event.city + ", " + event.country);
      }
    }
  }
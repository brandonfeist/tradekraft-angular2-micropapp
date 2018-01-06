import { AppSettings } from 'app/app-settings';
import { Component, OnInit }      from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Event } from './../../..//model/event';
import { EventService } from './../../../services/event.service';

@Component({
    selector: 'event-preview',
    templateUrl: './event-preview.component.html'
  })
  export class EventPreviewComponent implements OnInit {
    events: Event[] = [];
    defaultImage = AppSettings.loadImage;
    errorImage = AppSettings.errorImage;

    constructor(private eventService: EventService) { }

    ngOnInit() { 
      this.eventService.getEvents(new URLSearchParams("futureEvents=true&pageSize=4")).subscribe(data => {
        this.events = data.content;
      },
      err => {
        console.log("error getting events: ", err);
      });
    }

    private hasEvents(): boolean {
      return (this.events && this.events.length > 0);
    }
  }
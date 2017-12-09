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
    defaultImage = "assets/images/preload-image.jpg";
    errorImage = "assets/images/error-image.jpg";

    constructor(private eventService: EventService) { }

    ngOnInit() { 
      this.eventService.getEvents(new URLSearchParams("pageSize=4")).subscribe(data => {
        this.events = data.content;
      },
      err => {
        console.log("error getting events: ", err);
      });
    }
  }
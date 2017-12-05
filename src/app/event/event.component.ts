import { EventService } from './../services/event.service';
import { Component, OnInit }      from '@angular/core';
import { Event } from '@angular/router/src/events';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'events',
    templateUrl: './event.component.html'
  })
  export class EventComponent implements OnInit {
    private events: Event[];
    private highlightedEvent: Event;

    constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
      this.highlightedEvent = this.activatedRoute.snapshot.data['highlightedEvent'];
    }
  }
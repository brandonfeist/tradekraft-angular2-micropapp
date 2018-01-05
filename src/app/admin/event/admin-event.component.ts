import { EventService } from './../../services/event.service';
import { Event } from 'app/model/event';
import { SnackbarService } from 'app/services/snackbar.service';
import { Component, OnInit }  from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';

@Component({
  templateUrl: './admin-event.component.html'
})
export class AdminEventComponent implements OnInit {

  private loading: boolean = true;

  private events: Event[];

  private pastEvents: Event[];

  private dataSource;

  private displayedColumns = ['', 'name', 'officialEvent', 'startDateTime', 'endDateTime', 'actions'];

  private defaultImage: string = "assets/images/preload-image.jpg";

  private errorImage: string = "assets/images/error-image.jpg";

  private deleting = [];

  constructor(private eventService: EventService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.getAllEvents();
  }

  ngOnDestroy() {}

  private getAllEvents() {
    let urlSearchParams = new URLSearchParams('pastEvents=true&futureEvents=true&sortOrder=desc');

    this.eventService.getEvents(urlSearchParams).subscribe((events) => {
      this.loading = false;
    
      this.events = events.content;
      this.dataSource = new MatTableDataSource<Event>(this.events);

    }, err => {
      console.log("Events get error, ", err);
      this.snackbarService.openSnackbar("There was a problem getting the events.");

      this.loading = false;
    })
  }

  private formateDate(epochDate: number): string {
    return moment(epochDate).format('MMM Do YYYY, HH:mm:ss');
  }

  private formatOfficialEvent(officialEvent: boolean): string {
    if(officialEvent) {
      return "Official Event";
    } else {
      return "Unofficial Event";
    }
  }

  private isDeletingEvent(event: Event) {
    for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
      if(this.deleting[deleteIndex].slug === event.slug) {
        return true;
      }
    }
  }

  private deleteEvent(event: Event) {
    this.deleting.push({ slug: event.slug });

    if(confirm("Are you sure you want to delete " + event.name + "?")) {
      this.eventService.deleteEvent(event.slug).subscribe((data) => {
        console.log("Event deleted: ", data);

        for(let eventIndex = 0; eventIndex < this.events.length; eventIndex++) {
          if(event.slug === this.events[eventIndex].slug) {
            this.events.splice(eventIndex, 1);
          }
        }

        this.dataSource = new MatTableDataSource<Event>(this.events);

        this.snackbarService.openSnackbar(event.name + " deleted.");
      }, err => {
        console.log("err: ", err);
        this.snackbarService.openSnackbar("There was a problem deleting " + event.name + ".");

        for(let deleteIndex = 0; deleteIndex < this.deleting.length; deleteIndex++) {
          if(this.deleting[deleteIndex].slug === event.slug) {
            this.deleting.splice(deleteIndex, 1);
          }
        }
      });
    }
  }
}
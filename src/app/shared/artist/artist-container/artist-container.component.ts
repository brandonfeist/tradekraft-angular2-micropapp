import { AppSettings } from 'app/app-settings';
import { Artist } from './../../../model/artist';
import { Component, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment-timezone';

@Component({
  selector: 'artist-container',
  templateUrl: './artist-container.component.html'
})
export class ArtistContainerComponent {
  @Input() artist: Artist;
  @Input() noMargin: boolean = false;

  private defaultImage = AppSettings.loadImage;
  private errorImage = AppSettings.errorImage;
  private lazyLoadOffset = AppSettings.lazyLoadOffest;

  constructor() { }
}
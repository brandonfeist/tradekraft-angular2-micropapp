import { AbstractControl } from '@angular/forms';
import { Song } from "app/model/song";

export class TrackNumberValidation {
  static TrackNumber(AC: AbstractControl) {
    let songs = AC.get('songs') ? AC.get('songs').value : AC.get('songs');

    let sumOfTracks = 0;
    let requiredSumOfTracks = 0;

    if(songs) {
      for(let trackIndex = 1; trackIndex <= songs.length; trackIndex++) {
        requiredSumOfTracks += trackIndex;
        sumOfTracks += songs[trackIndex - 1].song.trackNumber;
      }
    }


    if(songs && sumOfTracks !== requiredSumOfTracks) {
      if(AC.get('songs')) {
        AC.get('songs').setErrors( { TrackNumbers: true } );
      }
    } else {
      return null
    }
  }
}
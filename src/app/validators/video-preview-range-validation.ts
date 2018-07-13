import {AbstractControl} from '@angular/forms';
export class VideoPreviewRangeValidation {

  static PreviewRange(AC: AbstractControl) {
    let range = AC.get('range') ? AC.get('range').value : AC.get('range');

    if(range) {
      if((range[1] - range[0]) < 10 || (range[1] - range[0]) > 60) {
        AC.get('range').setErrors( { PreviewRange: true } );
      }
    }

    return null;
  }
}
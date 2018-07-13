import { IndexSpinnerComponent } from './index-spinner/index-spinner.component';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'app/spinner/spinner/spinner.component';

@NgModule({
    imports:  [ 
      CommonModule
    ],
    exports: [
      SpinnerComponent,
      IndexSpinnerComponent
    ],
    declarations: [ 
      SpinnerComponent,
      IndexSpinnerComponent
    ]
  })
  export class SpinnerModule {}
import { RouterModule } from '@angular/router';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FooterComponent } from 'app/footer/footer.component';

@NgModule({
    imports:      [
      CommonModule,
      RouterModule
    ],
    exports: [
      FooterComponent
    ],
    declarations: [ 
      FooterComponent
    ]
  })
  export class FooterModule { }
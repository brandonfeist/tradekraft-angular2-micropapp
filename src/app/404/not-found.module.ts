import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule { }

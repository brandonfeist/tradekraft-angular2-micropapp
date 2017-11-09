import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap';

import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [
      CommonModule,
      CollapseModule
    ],
    exports: [
      NavbarComponent
    ],
    declarations: [
      NavbarComponent
    ],
})
export class NavbarModule { }
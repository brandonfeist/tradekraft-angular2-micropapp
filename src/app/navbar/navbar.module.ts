import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap';

import { NavbarComponent } from './navbar.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';

@NgModule({
    imports: [
      CommonModule,
      CollapseModule,
      CustomMaterialModule,
      RouterModule.forChild([])
    ],
    exports: [
      NavbarComponent
    ],
    declarations: [
      NavbarComponent
    ],
})
export class NavbarModule { }
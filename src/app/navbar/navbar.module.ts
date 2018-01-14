import { SharedModule } from './../shared/shared.module';
import { AdminNavbarComponent } from './admin/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

import { NavbarComponent } from './navbar.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';
import { MainNavbarComponent } from 'app/navbar/main/main-navbar.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
      CommonModule,
      CollapseModule,
      CustomMaterialModule,
      LazyLoadImageModule,
      SharedModule,
      BsDropdownModule.forRoot(),
      RouterModule.forChild([])
    ],
    exports: [
      NavbarComponent
    ],
    declarations: [
      NavbarComponent,
      MainNavbarComponent,
      AdminNavbarComponent
    ],
})
export class NavbarModule { }
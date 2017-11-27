import { AdminDashboardComponent } from 'app/admin/admin.component';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from 'app/admin/admin-routing.module';

@NgModule({
    imports:  [ 
      CommonModule,
      AdminRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      CustomMaterialModule,
      SharedModule
    ],
    declarations: [ 
      AdminDashboardComponent
    ]
  })
  export class AdminModule { }
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:  [ 
      CommonModule,
      AboutRoutingModule,
      CustomMaterialModule,
      SharedModule
    ],
    declarations: [ 
      AboutComponent,
    ]
  })
  export class AboutModule { }
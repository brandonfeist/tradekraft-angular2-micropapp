import { SharedModule } from './../shared/shared.module';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';

import { ReleaseComponent } from './release.component';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { ReleaseDetailsResolve } from './release-details/release-details.resolve';
import { ReleaseRoutingModule } from './release-routing.module';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';

@NgModule({
    imports:  [ 
      CommonModule,
      SharedModule,
      ReleaseRoutingModule,
      LazyLoadImageModule,
      ReactiveFormsModule,
      CustomMaterialModule,
      SharedModule
    ],
    declarations: [ 
      ReleaseComponent,
      ReleaseDetailsComponent
    ],
    providers: [
      ReleaseDetailsResolve
    ]
  })
  export class ReleaseModule { }
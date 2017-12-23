import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { HomeComponent }    from './home.component';
import { HomeVideoResolve } from 'app/home/home-video.resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      { 
        path: '', component: HomeComponent,
        resolve: { featuredVideo: HomeVideoResolve } 
      }
    ]
  )],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
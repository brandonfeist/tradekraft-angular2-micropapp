import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'releases', loadChildren: 'app/release/release.module#ReleaseModule' },
  { path: 'artists', loadChildren: 'app/artist/artist.module#ArtistModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
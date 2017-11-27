import { RoleGuard } from 'app/services/guard/role-guard.service';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/not-found.component';
import { AuthGuard } from 'app/services/guard/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'releases', loadChildren: 'app/release/release.module#ReleaseModule'},
  { path: 'artists', loadChildren: 'app/artist/artist.module#ArtistModule' },
  { path: 'connect', loadChildren: 'app/connect/connect.module#ConnectModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: '**', component: PageNotFoundComponent }
];

// , canActivate: [RoleGuard], data: {roles: ['SuperAdmin', 'TestRole']} 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
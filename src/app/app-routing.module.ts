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
  { path: 'events', loadChildren: 'app/event/event.module#EventModule' },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'connect', loadChildren: 'app/connect/connect.module#ConnectModule' },
  { path: 'accounts', loadChildren: 'app/accounts/accounts.module#AccountsModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { 
    path: 'admin', 
    loadChildren: 'app/admin/admin.module#AdminModule', 
    canActivate: [RoleGuard], 
    data: { permissions: ['VIEW_ADMIN_PANEL_PERMISSION'] }  
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
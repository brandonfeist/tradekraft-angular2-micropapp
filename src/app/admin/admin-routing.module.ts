import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import { AdminDashboardComponent } from 'app/admin/admin.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'dashboard', component: AdminDashboardComponent },
            { path: 'dashboard', component: AdminDashboardComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
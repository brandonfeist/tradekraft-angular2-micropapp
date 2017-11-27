import { AccountsResetComponent } from './reset/accounts-reset.component';
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';
import { AccountsRegisterComponent } from 'app/accounts/register/accounts-register.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'register', component: AccountsRegisterComponent },
            { path: 'reset', component: AccountsResetComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountsRoutingModule {}
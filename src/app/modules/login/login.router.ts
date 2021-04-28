import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // test = én adom meg .../test
                path: 'login',
                component: LoginComponent
            }
        ])
    ],
    exports: [RouterModule]

})

export class LoginRouter { }

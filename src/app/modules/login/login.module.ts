import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login.router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

    imports: [
        CommonModule,
        LoginRouter,
        MatSnackBarModule
      
    ],
    declarations: [
        LoginComponent
    ],
    exports: [

    ]
})

export class LoginModule { }

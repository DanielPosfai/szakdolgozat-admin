import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmDialog.component';

@NgModule({

    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        ConfirmDialogComponent
    ],
    exports: [

    ],
    entryComponents:[
        ConfirmDialogComponent
    ]
})

export class ConfirmDialogModule { }

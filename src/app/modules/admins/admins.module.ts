import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogModule } from '@app/shared/confirmDialog/confirmDialog.module';
import { AddAdminComponent } from './addAdminComponent/addAdmin.component';
import { AdminsComponent } from './adminComponent/admins.component';
import { AdminsRouter } from './admins.router';
import { EditAdminComponent } from './editAdminComponent/editAdmin.component';

@NgModule({

    imports: [
        CommonModule,
        AdminsRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogModule,
        MatSortModule
    ],
    declarations: [

        AdminsComponent,
        AddAdminComponent,
        EditAdminComponent

    ],
    exports: [

    ]
})

export class AdminsModule { }

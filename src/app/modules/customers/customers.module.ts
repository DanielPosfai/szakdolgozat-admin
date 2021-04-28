import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogModule } from '@app/shared/confirmDialog/confirmDialog.module';
import { AddCustomerComponent } from './addCustomerComponent/addCustomer.component';
import { CustomersComponent } from './customerComponent/customers.component';
import { CustomerRouter } from './customers.router';
import { EditCustomerComponent } from './editCustomerComponent/editCustomer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@NgModule({

    imports: [
        CommonModule,
        CustomerRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        ConfirmDialogModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule
    ],
    declarations: [

        CustomersComponent,
        AddCustomerComponent,
        EditCustomerComponent
    ],
    exports: [

    ]
})

export class CustomersModule { }

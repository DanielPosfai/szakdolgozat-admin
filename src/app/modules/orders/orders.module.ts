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
import { OrdersRouter } from './orders.router';
import { OrdersComponent } from './ordersComponent/orders.component';

@NgModule({

    imports: [
        CommonModule,
        OrdersRouter,
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

        OrdersComponent
        
    ],
    exports: [

    ]
})

export class OrdersModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddItemComponent } from './addItemComponent/addItem.component';
import { EditItemComponent } from './editItemComponent/editItem.component';
import { ItemsRouter } from './items.router';
import { ItemsComponent } from './ItemsComponent/items.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogModule } from '@app/shared/confirmDialog/confirmDialog.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({

    imports: [
        CommonModule,
        ItemsRouter,
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

        ItemsComponent,
        AddItemComponent,
        EditItemComponent
    ],
    exports: [

    ]
})

export class ItemsModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddProducerComponent } from './addProducerComponent/addProducer.component';
import { EditProducerComponent } from './editProducerComponent/editProducer.component';
import { ProducersComponent } from './producerComponent/producers.component';
import { ProducersRouter } from './producers.router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogModule } from '@app/shared/confirmDialog/confirmDialog.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

    imports: [
        CommonModule,
        ProducersRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogModule,
        MatSortModule,
        MatSnackBarModule
    ],
    declarations: [

        ProducersComponent,
        AddProducerComponent,
        EditProducerComponent
    ],
    exports: [

    ]
})

export class ProducersModule { }

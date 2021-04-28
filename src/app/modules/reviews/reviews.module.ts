import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReviewComponent } from './reviewComponent/reviews.component';
import { ReviewsRouter } from './reviews.router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogModule } from '@app/shared/confirmDialog/confirmDialog.module';

@NgModule({

    imports: [
        CommonModule,
        ReviewsRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogModule
    ],
    declarations: [

        ReviewComponent

    ],
    exports: [

    ]
})

export class ReviewsModule { }

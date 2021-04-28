import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './reviewComponent/reviews.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list/:type',
                component: ReviewComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class ReviewsRouter { }

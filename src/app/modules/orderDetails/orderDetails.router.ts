import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditOrderDetailsComponent } from './editOrderDetailsComponent/editOrderDetails.component';
import { OrderDetailsComponent } from './orderDetailsComponent/orderDetails.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list/:id',
                component: OrderDetailsComponent
            },
            {
                path: 'edit/:id',
                component: EditOrderDetailsComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class OrderDetailsRouter { }

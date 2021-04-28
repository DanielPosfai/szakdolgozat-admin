import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './ordersComponent/orders.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                component: OrdersComponent
            }
            
        ])
    ],
    exports: [RouterModule]

})

export class OrdersRouter { }

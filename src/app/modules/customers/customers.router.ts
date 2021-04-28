import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddCustomerComponent } from './addCustomerComponent/addCustomer.component';
import { CustomersComponent } from './customerComponent/customers.component';
import { EditCustomerComponent } from './editCustomerComponent/editCustomer.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                component: CustomersComponent
            },
            {
                path: 'add',
                component: AddCustomerComponent
            },
            {
                path: 'edit/:id',
                component: EditCustomerComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class CustomerRouter { }

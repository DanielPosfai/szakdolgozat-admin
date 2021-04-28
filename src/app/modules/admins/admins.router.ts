import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddAdminComponent } from './addAdminComponent/addAdmin.component';
import { AdminsComponent } from './adminComponent/admins.component';
import { EditAdminComponent } from './editAdminComponent/editAdmin.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                component: AdminsComponent
            },
            {
                path: 'add',
                component: AddAdminComponent
            },
            {
                path: 'edit/:id',
                component: EditAdminComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class AdminsRouter { }

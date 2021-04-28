import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddItemComponent } from './addItemComponent/addItem.component';
import { EditItemComponent } from './editItemComponent/editItem.component';
import { ItemsComponent } from './ItemsComponent/items.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                component: ItemsComponent
            },
            {
                path: 'add',
                component: AddItemComponent
            },
            {
                path: 'edit/:id',
                component: EditItemComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class ItemsRouter { }

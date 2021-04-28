import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProducerComponent } from './addProducerComponent/addProducer.component';
import { EditProducerComponent } from './editProducerComponent/editProducer.component';
import { ProducersComponent } from './producerComponent/producers.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                component: ProducersComponent
            },
            {
                path: 'add',
                component: AddProducerComponent
            },
            {
                path: 'edit/:id',
                component: EditProducerComponent
            }
            

        ])
    ],
    exports: [RouterModule]

})

export class ProducersRouter { }

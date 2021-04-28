import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatsComponent } from './stats.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'stats',
                component: StatsComponent
            }
        ])
    ],
    exports: [RouterModule]

})

export class StatsRouter { }

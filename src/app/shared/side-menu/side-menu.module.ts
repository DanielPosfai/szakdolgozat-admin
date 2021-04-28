import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SideMenuComponent } from './side-menu.component';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule,
        NgbNavModule,
        NgbModule,
        RouterModule,
        MatListModule,
        MatButtonModule
        // adott modul routere
    ],
    declarations: [
        // általam készített componensek jönnek ide
        SideMenuComponent
    ],
    exports: [
        SideMenuComponent
    ]
})

export class SideMenuModule { }
// TestModul = saját elnevezés

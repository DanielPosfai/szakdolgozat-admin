import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';


@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule,
        NgbNavModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})

export class HeaderModule { }
// TestModul = saját elnevezés

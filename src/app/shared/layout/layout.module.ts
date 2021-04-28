import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuModule } from '@shared/side-menu/side-menu.module';
import { HeaderModule } from '@shared/header/header.module';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
  

@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule,
        HeaderModule,
        SideMenuModule,
        RouterModule,
        MatSidenavModule
        // adott modul routere
    ],
    declarations: [
        // általam készített componensek jönnek ide
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ]
})

export class LayoutModule {
    public static forRoot(): ModuleWithProviders<LayoutModule> {
        return {
            ngModule: LayoutModule
        };
    }
}
// TestModul = saját elnevezés

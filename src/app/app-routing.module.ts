import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/layout/layout.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {
    path: '', component: LayoutComponent, children: [
      { path: 'customers', loadChildren: () => import('@app/modules/customers/customers.module').then(m => m.CustomersModule)},
      { path: 'producers', loadChildren: () => import('@app/modules/producers/producers.module').then(m => m.ProducersModule)},
      { path: 'admins', loadChildren: () => import('@app/modules/admins/admins.module').then(m => m.AdminsModule)},
      { path: 'reviews', loadChildren: () => import('@app/modules/reviews/reviews.module').then(m => m.ReviewsModule)},
      { path: 'items', loadChildren: () => import('@app/modules/items/items.module').then(m => m.ItemsModule)},
      { path: 'orders', loadChildren: () => import('@app/modules/orders/orders.module').then(m => m.OrdersModule)},
      { path: 'orderDetails', loadChildren: () => import('@app/modules/orderDetails/orderDetails.module').then(m => m.OrderDetailsModule)},
      { path: '', loadChildren: () => import('@app/modules/stats/stats.module').then(m => m.StatsModule)}
    ]
  },
  { path: 'login', redirectTo: 'login' },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

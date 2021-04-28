import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { Order } from '@app/shared/models/order.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { OrdersService } from './orders.service';



@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  public orderList = new Array<Order>();
  displayedColumns: string[] = ['id', 'orderdate', 'status', 'totalprice', 'customerid', 'edit'];
  dataSource = new MatTableDataSource<Order>(this.orderList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();
  constructor(
    private service: OrdersService,
    private dialog: MatDialog,
    private router: Router
    ) { }

 

  ngOnInit() {
    
    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
    this.getOrdersList();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getOrdersList(): void {
    this.service.getOrders().subscribe({
      next: response => {

        this.dataSource.data = response as Order[]
      },
      error: () => {

      }
    });
  }

  openDialog(id:string): void {

    this.dialog.open(ConfirmDialogComponent,{
      data:{
        title: 'Biztos benne hogy törli a rendelést?'
      }
    }).afterClosed().subscribe((confirmed: boolean) =>{
      if(confirmed){
        this.service.deleteOrder(id).subscribe({
         next: () => {
           this.getOrdersList();

         },
         error: () => {
         }
       });
      }
    });
 }

}

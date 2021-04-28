import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { OrderDetails } from '@app/shared/models/orderDetails.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { OrderDetailsService } from './orderDetails.service';



@Component({
  selector: 'app-orderDetails',
  templateUrl: 'orderDetails.component.html',
  styleUrls: ['orderDetails.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {

  public orderDetailsList = new Array<OrderDetails>();
  displayedColumns: string[] = ['id', 'orderid', 'productname', 'unitprice', 'unittype', 'quantity', 'status', 'productid', 'edit'];
  dataSource = new MatTableDataSource<OrderDetails>(this.orderDetailsList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();
  constructor(
    private service: OrderDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  private itemId = 'id';
  private id = this.route.snapshot.params[this.itemId];

  ngOnInit() {
    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
      this.getDetailList();
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDetailList(): void {
    this.service.getOrderDetails(this.id).subscribe({
      next: response => {

        this.dataSource.data = response as OrderDetails[]
      },
      error: () => {

      }
    });
  }

  openDialog(id: string): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Biztos benne hogy törli ezt a terméket a rendelésből?'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteDetail(id).subscribe({
          next: () => {
            this.getDetailList();

          },
          error: () => {
          }
        });
      }
    });
  }
}

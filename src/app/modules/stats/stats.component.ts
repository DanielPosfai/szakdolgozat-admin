import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from '@app/shared/models/order.model';
import { Stat } from '@app/shared/models/stat.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { StatsService } from './stats.service';


@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.scss']
})
export class StatsComponent implements OnInit, AfterViewInit {

  public orderList = new Array<Order>();
  public orders = new Array<Order>();
  public today = new Date();
  displayedColumns: string[] = ['id', 'orderdate', 'status', 'totalprice', 'customerid'];
  dataSource = new MatTableDataSource<Order>(this.orderList);

  public numberOfOrders: number;
  public totalValue: number;
  public avarageValuePerOrder: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();

  constructor(
    private service: StatsService,
    private router: Router,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit() {

    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onClick(startDate: string, enddate: string) {
    this.numberOfOrders = 0;
    this.avarageValuePerOrder = 0;
    this.totalValue = 0;

    if (!startDate) {
      this.snackBar.open('A kezdő dátum nem lehet üres!', 'Ok', {
        panelClass: ['snackbar-color-warn'],
        duration: 3000

      });
      return;
    }
    const tempStartDate = new Date(startDate);
    const sDate = this.datepipe.transform(tempStartDate, 'yyyy-MM-dd');
    let eDate = "";
    if (enddate) {
      let tempEndDate = new Date(enddate);
      eDate = this.datepipe.transform(tempEndDate, 'yyyy-MM-dd');
    } else {
      
      eDate = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    }
    this.service.getStats(sDate, eDate).subscribe({
      next: response => {

        this.dataSource.data = response as Order[];
        this.orders = response;
        this.calculateStats();
      },
      error: () => {

      }
    });

  }

  private calculateStats(): void {
    this.numberOfOrders = this.dataSource.data.length;
    for (const currentOrder of this.orders) {
      this.totalValue += currentOrder.totalprice;
    }
    this.avarageValuePerOrder = this.totalValue / this.numberOfOrders;
  }
}

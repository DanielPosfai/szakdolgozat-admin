import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@app/shared/models/user.model';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { CustomersService } from './customers.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  public userList = new Array<User>();
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'username', 'email', 'phonenumber', 'edit'];
  dataSource = new MatTableDataSource<User>(this.userList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(
    private service: CustomersService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
      this.getCustomerList();
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCustomerList(): void {
    this.service.getCustomers().subscribe({
      next: response => {

        this.dataSource.data = response as User[]
      },
      error: () => {

      }
    });
  }

  openDialog(id: string): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Biztos benne hogy törli a felhasználót?'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteCustomer(id).subscribe({
          next: () => {
            this.getCustomerList();

          },
          error: () => {
          }
        });
      }
    });
  }

}



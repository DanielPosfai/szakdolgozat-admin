import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { User } from '@app/shared/models/user.model';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { ProducersService } from './producers.service';


@Component({
  selector: 'app-producers',
  templateUrl: 'producers.component.html',
  styleUrls: ['producers.component.scss']
})
export class ProducersComponent implements OnInit, AfterViewInit {

  public userList = new Array<User>();
  displayedColumns: string[] = ['id', 'image', 'lastname', 'firstname', 'username', 'email', 'phonenumber', 'edit'];
  dataSource = new MatTableDataSource<User>(this.userList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(
    private service: ProducersService,
    private dialog: MatDialog,
    private router: Router
  ) { }



  ngOnInit() {

    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
      this.getProducerList();
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducerList(): void {
    this.service.getProducers().subscribe({
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
        this.service.deleteProducer(id).subscribe({
          next: () => {
            this.getProducerList();

          },
          error: () => {
          }
        });
      }
    });
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { Item } from '@app/shared/models/item.model';
import { User } from '@app/shared/models/user.model';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { ItemsService } from './items.service';



@Component({
  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  public itemList = new Array<Item>();
  displayedColumns: string[] = ['id', 'image', 'productname', 'details', 'unit', 'price', 'category', 'producer', 'edit'];
  dataSource = new MatTableDataSource<Item>(this.itemList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAuthenticated = AuthUtil.checkAuthorization();

  constructor(
    private service: ItemsService,
    private dialog: MatDialog,
    private router: Router
  ) { }



  ngOnInit() {
    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
      this.getItemList();
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getItemList(): void {
    this.service.getItems().subscribe({
      next: response => {

        this.dataSource.data = response as Item[]
      },
      error: () => {

      }
    });
  }

  openDialog(id: string): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Biztos benne hogy törli a terméket?'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteItem(id).subscribe({
          next: () => {
            this.getItemList();
          },
          error: () => {
          }
        });
      }
    });
  }

}

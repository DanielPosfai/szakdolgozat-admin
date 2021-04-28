import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirmDialog/confirmDialog.component';
import { ProducerReview } from '@app/shared/models/producerReview.model';
import { Review } from '@app/shared/models/review.model';
import { User } from '@app/shared/models/user.model';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { Subscription } from 'rxjs';
import { ReviewsService } from './reviews.service';


@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewComponent implements OnInit, AfterViewInit {

  // private tempType = 'type';
  public type: string;

  public routeParamSubscription: Subscription;

  public reviewList = new Array<Review>();
  displayedColumns: string[] = ['id', 'reviewdId', 'review', 'edit'];
  dataSource = new MatTableDataSource<Review>(this.reviewList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(
    private service: ReviewsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
      this.routeParamSubscription = this.route.params.subscribe((params) => {
        this.type = params.type;
        this.getReviews();
      })
    } else {
      this.router.navigate(['/login']);
    }


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getReviews(): void {

    if (this.type === 'producer') {
      this.service.getProducerReviews().subscribe({
        next: response => {

          this.dataSource.data = response as Review[];
        },
        error: () => {

        }
      });
    } else {
      this.service.getProductReviews().subscribe({
        next: response => {

          this.dataSource.data = response as Review[]
        },
        error: () => {

        }
      });
    }
  }

  openDialog(id: string): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Biztos benne hogy törli ezt a visszajelzést?'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        if (this.type === 'producer') {
          this.service.deleteProducerReview(id).subscribe({
            next: () => {

              this.getReviews();
            },
            error: () => {

            }
          });
        } else {
          this.service.deleteProductReview(id).subscribe({
            next: () => {

              this.getReviews();
            },
            error: () => {

            }
          });
        }
      }
    });
  }
}

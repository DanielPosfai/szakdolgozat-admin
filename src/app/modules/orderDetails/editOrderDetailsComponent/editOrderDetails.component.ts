import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '@app/shared/models/orderDetails.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { EditOrderDetailsService } from './editOrderDetails.service';


@Component({
    selector: 'app-editOrderDetails',
    templateUrl: 'editOrderDetails.component.html',
    styleUrls: ['editOrderDetails.component.scss']
})
export class EditOrderDetailsComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    public orderDetail = new OrderDetails;
    public orderDetailId = 'id';
    public id = this.route.snapshot.params[this.orderDetailId];

    constructor(private service: EditOrderDetailsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.getSingleOrderDetail();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            productid: new FormControl(this.orderDetail.productid, [
            ]),
            productname: new FormControl(this.orderDetail.productname, [
            ]),
            unit: new FormControl(this.orderDetail.unittype, [
            ]),
            unitprice: new FormControl(this.orderDetail.unitprice, [
            ]),
            quantity: new FormControl(this.orderDetail.quantity, [
                Validators.required,
            ]),
            status: new FormControl(this.orderDetail.status, [
            ])
        });

    }

    getSingleOrderDetail() {
        this.service.getOrderDetail(this.id).subscribe({
            next: response => {
                this.orderDetail = response;
                this.initForm();
            },
            error: () => {
            }
        });
    }

    onSubmit() {

        if (this.form.invalid) {
            return;
        }
        let newOrderDetail = new OrderDetails;
        newOrderDetail.productid = this.form.get("productid").value;
        newOrderDetail.productname = this.form.get("productname").value;
        newOrderDetail.unittype = this.form.get("unit").value;
        newOrderDetail.unitprice = this.form.get("unitprice").value;
        newOrderDetail.quantity = this.form.get("quantity").value;
        newOrderDetail.status = this.form.get("status").value;

        this.service.editOrderDetail(newOrderDetail, this.id).subscribe({
            next: response => {

                if (response == 'email already exists') {
                    alert("email alredy exist");
                    return;
                }
                this.router.navigate(['/orderDetails/list/' + this.orderDetail.orderid]);
            },
            error: err => {
                alert(err);
            }
        }
        );

    }
}

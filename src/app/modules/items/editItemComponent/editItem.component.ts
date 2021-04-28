import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { Item } from '@app/shared/models/item.model';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { Observable, Subscriber } from 'rxjs';
import { EditItemService } from './editItem.service';


@Component({
    selector: 'app-editItem',
    templateUrl: 'editItem.component.html',
    styleUrls: ['editItem.component.scss']
})
export class EditItemComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    public item = new Item;
    public userId = 'id';
    public id = this.route.snapshot.params[this.userId];

    public selectedFile: File;
    public imagePreview: Observable<any>;
    private base64image: string | ArrayBuffer;

    constructor(
        private service: EditItemService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.getSingleProduct();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            productname: new FormControl(this.item.productname, [
                Validators.required
            ]),
            unit: new FormControl(this.item.unit, [
            ]),
            price: new FormControl(this.item.price, [
                Validators.required
            ]),
            category: new FormControl(this.item.category, [
                Validators.required,
            ]),
            details: new FormControl(this.item.details, [
                Validators.required,
            ]),
            imagePreview: new FormControl('', [

            ])

        });

    }

    getSingleProduct() {
        this.service.getProduct(this.id).subscribe({
            next: response => {
                this.item = response;
                this.initForm();
            },
            error: () => {
            }
        });
    }

    onSubmit(): void {

        if (this.form.invalid) {

            return;
        }

        const newItem = new Item();
        newItem.category = this.form.get("category").value;
        newItem.productname = this.form.get("productname").value;
        newItem.details = this.form.get("details").value;
        newItem.price = this.form.get("price").value;
        newItem.unit = this.form.get("unit").value;
        newItem.id = this.item.id;
        
        const newUser = new User();
        newUser.id = JSON.parse(sessionStorage.getItem('userInfo')).id
        newItem.user = newUser;
        newItem.image = this.base64image.toString();
        console.log(newItem);
        this.service.editProduct(newItem).subscribe({
            next: response => {

                if (response == 'user already exists') {
                    alert("user alredy exist");
                    return;

                }
                if (response == 'email already exists') {
                    alert("email alredy exist");
                    return;
                }
                this.router.navigate(['/items/list']);
            },
            error: err => {
                alert(err);
            }
        });

    }

    onChange($event: Event) {
        const file = ($event.target as HTMLInputElement).files[0];
        this.selectedFile = ($event.target as HTMLInputElement).files[0];
        this.convertToBase64(file);
    }

    convertToBase64(file: File) {
        const observable = new Observable((subscriber: Subscriber<any>) => {
            this.readFile(file, subscriber);
        });
        observable.subscribe((image) => {
            this.imagePreview = image;
            //console.log();
        });

    }

    readFile(file: File, subscriber: Subscriber<any>) {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);

        filereader.onload = () => {
            subscriber.next(filereader.result);
            subscriber.complete();
            this.base64image = filereader.result;
        };
        filereader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        };
    }
}

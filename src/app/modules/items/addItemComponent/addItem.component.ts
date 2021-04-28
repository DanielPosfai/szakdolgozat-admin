import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '@app/shared/models/item.model';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { Observable, Subscriber } from 'rxjs';
import { AddItemService } from './addItem.service';



@Component({
    selector: 'app-addItem',
    templateUrl: 'addItem.component.html',
    styleUrls: ['addItem.component.scss']
})
export class AddItemComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();

    public selectedFile: File;
    public imagePreview: Observable<any>;
    private base64image: string | ArrayBuffer;

    constructor(private service: AddItemService, private router: Router) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.initForm();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            productname: new FormControl('', [
                Validators.required
            ]),
            unit: new FormControl('', [
                Validators.required
            ]),
            price: new FormControl('', [
                Validators.required
            ]),
            category: new FormControl('', [
                Validators.required,
            ]),
            details: new FormControl('', [
                Validators.required,
            ]),
            imagePreview: new FormControl('', [

            ])

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

        const newUser = new User();
        newUser.id = JSON.parse(sessionStorage.getItem('userInfo')).id
        newItem.user = newUser;
        newItem.image = this.base64image.toString();
        console.log(newItem);
        this.service.addNewItem(newItem).subscribe({
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

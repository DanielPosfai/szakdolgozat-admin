import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { Observable, Subscriber } from 'rxjs';
import { AddProducerService } from './addProducer.service';



@Component({
    selector: 'app-addProducer',
    templateUrl: 'addProducer.component.html',
    styleUrls: ['addProducer.component.scss']
})
export class AddProducerComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();

    public selectedFile: File;
    public imagePreview: Observable<any>;
    private base64image: string | ArrayBuffer;

    constructor(
        private service: AddProducerService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.initForm();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl('', [
                Validators.required
            ]),
            firstName: new FormControl('', [
                Validators.required
            ]),
            userName: new FormControl('', [
                Validators.required
            ]),
            imagePreview: new FormControl('', [
            ]),
            phoneNumber: new FormControl('', [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(11)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z]+$')
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', [])

        }, {
            validators: ConfirmedValidator.bind(this)
            // ennek a formnak átadása
        })

    }

    onSubmit() {

        if (this.form.invalid) { return; }

        let newUser = new User;
        newUser.firstname = this.form.get("lastName").value;
        newUser.lastname = this.form.get("lastName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;
        newUser.password = this.form.get("password").value;
        newUser.image = this.base64image.toString();
        console.log(this.form.get("imagePreview").value);
        newUser.role = "producer";


        this.service.addNewUser(newUser).subscribe({
            next: response => {
                if (response == 'user already exists') {

                    this.snackBar.open('A megadott felhasználónév foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn'],

                    });
                    return;

                }
                if (response == 'email already exists') {
                    this.snackBar.open('A megadott email cím foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn']
                    });
                    return;
                }
                this.snackBar.open('Sikeres hozzáadás!', 'Ok', {
                    panelClass: ['snackbar-color'],
                    duration: 3000
                });
                this.router.navigate(['/producers/list']);
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

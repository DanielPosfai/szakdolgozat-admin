import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { Observable, Subscriber } from 'rxjs';
import { EditProducerService } from './editProducer.service';


@Component({
    selector: 'app-editProducer',
    templateUrl: 'editProducer.component.html',
    styleUrls: ['editProducer.component.scss']
})
export class EditProducerComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    public producer = new User;
    public userId = 'id';
    public id = this.route.snapshot.params[this.userId];

    public selectedFile: File;
    public imagePreview: Observable<any>;
    private base64image: string | ArrayBuffer;

    constructor(
        private service: EditProducerService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
        ) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.getSingleProducer();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl(this.producer.lastname, [
                Validators.required
            ]),
            firstName: new FormControl(this.producer.firstname, [
                Validators.required
            ]),
            userName: new FormControl(this.producer.username, [
                Validators.required
            ]),
            phoneNumber: new FormControl(this.producer.phonenumber, [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(11)
            ]),
            email: new FormControl(this.producer.email, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z]+$')
            ]),
            password: new FormControl('', [
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', [])

        }, {
            validators: ConfirmedValidator.bind(this)
            // ennek a formnak átadása
        })

    }

    getSingleProducer() {
        this.service.getProducer(this.id).subscribe({
            next: response => {
                this.producer = response;
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

        let newUser = new User;
        newUser.lastname = this.form.get("lastName").value;
        newUser.firstname = this.form.get("firstName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;

        newUser.image = this.base64image.toString();
        newUser.password = this.form.get("password").value;

        newUser.role = "producer";

        console.log(newUser);
        this.service.editUser(newUser, this.id).subscribe({
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

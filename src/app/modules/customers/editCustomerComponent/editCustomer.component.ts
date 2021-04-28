import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';

import { EditCustomerService } from './editCustomer.service';

@Component({
    selector: 'app-editCustomer',
    templateUrl: 'editCustomer.component.html',
    styleUrls: ['editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    public customer = new User;
    public userId = 'id';
    public id = this.route.snapshot.params[this.userId];

    constructor(
        private service: EditCustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        if (this.isAuthenticated) {
            this.getSingleCustomer();
        } else {
            this.router.navigate(['/login']);
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl(this.customer.lastname, [
                Validators.required
            ]),
            firstName: new FormControl(this.customer.firstname, [
                Validators.required
            ]),
            userName: new FormControl(this.customer.username, [
                Validators.required
            ]),
            phoneNumber: new FormControl(this.customer.phonenumber, [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(11)
            ]),
            email: new FormControl(this.customer.email, [
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

    getSingleCustomer() {
        this.service.getCustomer(this.id).subscribe({
            next: response => {
                this.customer = response;
                this.initForm();
            },
            error: () => {
            }
        });
    }

    onSubmit() {

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log("here1");
            return;

        }
        console.log("here");
        let newUser = new User;
        newUser.lastname = this.form.get("lastName").value;
        newUser.firstname = this.form.get("firstName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;
        newUser.password = this.form.get("password").value;

        newUser.role = "customer";

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
                this.router.navigate(['/customers/list']);
            },
            error: err => {
                alert(err);
            }
        });
    }
}

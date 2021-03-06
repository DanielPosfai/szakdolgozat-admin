import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { AddCustomerService } from './addCustomer.service';



@Component({
    selector: 'app-addCustomer',
    templateUrl: 'addCustomer.component.html',
    styleUrls: ['addCustomer.component.scss']
})
export class AddCustomerComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    constructor(private service: AddCustomerService, private router: Router, private snackBar: MatSnackBar) { }

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
            // ennek a formnak ??tad??sa
        })

    }

    onSubmit() {

        // stop here if form is invalid
        if (this.form.invalid) {

            return;
        }

        let newUser = new User;
        newUser.firstname = this.form.get("lastName").value;
        newUser.lastname = this.form.get("lastName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;
        newUser.password = this.form.get("password").value;
        newUser.role = "customer";


        this.service.addNewUser(newUser).subscribe({
            next: response => {

                if (response == 'user already exists') {

                    this.snackBar.open('A megadott felhaszn??l??n??v foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn'],

                    });
                    return;

                }
                if (response == 'email already exists') {
                    this.snackBar.open('A megadott email c??m foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn']
                    });
                    return;
                }
                this.snackBar.open('Sikeres hozz??ad??s!', 'Ok', {
                    panelClass: ['snackbar-color'],
                    duration: 3000
                });

                this.router.navigate(['/customers/list']);
            },
            error: err => {
                alert(err);
            }
        }
        );

    }
}

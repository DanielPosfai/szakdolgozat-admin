import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(
    private service: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    if (this.isAuthenticated) {
      this.router.navigate(['/customers/list']);
    }

  }

  doLogin(username: string, password: string) {

    this.service.login(username, password).subscribe({
      next: response => {
        if (JSON.parse(JSON.stringify(response)).role === 'admin') {
          sessionStorage.setItem('userInfo', JSON.stringify(response));
          sessionStorage.setItem('token', btoa(username + ':' + password));
          this.router.navigate(['/customers/list']);
        } else {
          this.openWarning();
        }

      },
      error: () => {
        this.openWarning();
      }
    });

    // this.service.login(username, password).then(
    //   response => {

    //     sessionStorage.setItem('userInfo', JSON.stringify(response));
    //     sessionStorage.setItem('token', btoa(username + ':' + password));
    //     this.router.navigate(['/customers/list']);


    //   }).catch(
    //     () => {
    //       alert(`Hibás jelszó vagy felhasználónév!`);
    //     });
  }

  openWarning():void{
    this.snackBar.open('Hibás jelszó vagy felhasználónév!', 'Ok', {
      panelClass: ['snackbar-color-warn'],
      duration: 10000
    });
  }
}

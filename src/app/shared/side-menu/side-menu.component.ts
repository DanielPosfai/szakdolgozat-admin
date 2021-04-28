import { Component } from '@angular/core';
import { AuthUtil } from '../utils/authorizationCheck.util';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent{


  public isAuthenticated = AuthUtil.checkAuthorization();

  public isNavbarCollapsed = true;
s
  public menuItems = [
    { tabname: 'Vásárlók', path: 'customers/list' },
    { tabname: 'Termelők', path: 'producers/list'},
    { tabname: 'Adminisztrátorok', path: 'admins/list'},
    { tabname: 'Termékek', path: 'items/list'},
    { tabname: 'Rendelések', path: 'orders/list' },
    { tabname: 'Termék vissszajelzések', path: 'reviews/list/item' },
    { tabname: 'Termelő vissszajelzések', path: 'reviews/list/producer' },
    { tabname: 'Statisztikák', path: 'stats' }
  ];

  constructor() {

  }
}

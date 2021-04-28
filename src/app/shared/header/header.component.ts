import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

    this.unsubscribe.next();
    this.unsubscribe.complete();

  }

  doLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
  }

}

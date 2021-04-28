import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { LoginModule } from './modules/login/login.module';
import { LayoutModule } from './shared/layout/layout.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule.forRoot(),
    LoginModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

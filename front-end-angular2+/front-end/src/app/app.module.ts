import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*modules*/
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/*components*/
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Error404Component } from './error404/error404.component';

/*routes*/
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

/*services*/
import { ViaCepService } from './services/viacep.service';
import { DatePipe } from '@angular/common';
import { HttpBackendRequestService } from './services/http-backend-request.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    Error404Component,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [ViaCepService, DatePipe, HttpBackendRequestService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

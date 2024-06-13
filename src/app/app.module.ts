import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { registerComponent } from './pages/register/register.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/partials/logout/logout.component';
import { loginComponent } from './pages/login/login.component';
import { EmployeeApptComponent } from './pages/employee-appt/employee-appt.component';
import { EmployeeViewComponent } from './pages/employee-options/employee-view/employee-view.component';
import { EmployeeEditComponent } from './pages/employee-options/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './pages/employee-options/employee-delete/employee-delete.component';
import { EmployeeSearchComponent } from './pages/employee-options/employee-search/employee-search.component';
import { EmployeeCreateComponent } from './pages/employee-options/employee-create/employee-create.component';
import { CustViewComponent } from './pages/employee-options/cust-view/cust-view.component';
import { CustEditComponent } from './pages/employee-options/cust-edit/cust-edit.component';
// import { CustSearchComponent } from './pages/employee-options/cust-search/cust-search.component';
import { CustDeleteComponent } from './pages/employee-options/cust-delete/cust-delete.component';
import { CustCreateComponent } from './pages/employee-options/cust-create/cust-create.component';
import { CustomerViewComponent } from './pages/customer-home/customer-view/customer-view.component';
import { ApptCreateComponent } from './pages/employee-options/appt-create/appt-create.component';
import { ApptDeleteComponent } from './pages/employee-options/appt-delete/appt-delete.component';
import { ApptEditComponent } from './pages/employee-options/appt-edit/appt-edit.component';
// import { ApptViewComponent } from './pages/employee-options/appt-view/appt-view.component';
import { ApptSearchComponent } from './pages/employee-options/appt-search/appt-search.component';
import { ServiceSearchComponent } from './pages/employee-options/service-search/service-search.component';
import { ServiceCreateComponent } from './pages/employee-options/service-create/service-create.component';
import { ServiceEditComponent } from './pages/employee-options/service-edit/service-edit.component';
import { ServiceViewComponent } from './pages/employee-options/service-view/service-view.component';
import { ServiceDeleteComponent } from './pages/employee-options/service-delete/service-delete.component';
import { ApptViewComponent } from './pages/employee-options/appt-view/appt-view.component';
import { CustSearchComponent } from './pages/employee-options/cust-search/cust-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ServicesComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    registerComponent,
    loginComponent,   
    LogoutComponent,
    EmployeeApptComponent,   
    EmployeeViewComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    EmployeeSearchComponent,
    EmployeeCreateComponent,
    CustViewComponent,
    CustEditComponent,
    CustSearchComponent,
    CustDeleteComponent,
    CustCreateComponent,
    CustomerViewComponent,
    ApptCreateComponent,
    ApptDeleteComponent,
    ApptEditComponent,
    ApptViewComponent,
    ApptSearchComponent,
    ServiceSearchComponent,
    ServiceCreateComponent,
    ServiceEditComponent,
    ServiceViewComponent,
    ServiceDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

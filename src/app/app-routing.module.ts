import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

import { LogoutComponent } from './pages/partials/logout/logout.component';
import { registerComponent } from './pages/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { loginComponent } from './pages/login/login.component';
import { EmployeeApptComponent } from './pages/employee-appt/employee-appt.component';

//================================================
//              employee option
//================================================
import { EmployeeDeleteComponent } from './pages/employee-options/employee-delete/employee-delete.component';
import { EmployeeViewComponent } from './pages/employee-options/employee-view/employee-view.component';
import { EmployeeEditComponent } from './pages/employee-options/employee-edit/employee-edit.component';
import { EmployeeSearchComponent } from './pages/employee-options/employee-search/employee-search.component';
import { EmployeeCreateComponent } from './pages/employee-options/employee-create/employee-create.component';
import { CustCreateComponent } from './pages/employee-options/cust-create/cust-create.component';
// import { CustSearchComponent } from './pages/employee-options/cust-search/cust-search.component';
import { CustEditComponent } from './pages/employee-options/cust-edit/cust-edit.component';
import { CustViewComponent } from './pages/employee-options/cust-view/cust-view.component';
import { CustDeleteComponent } from './pages/employee-options/cust-delete/cust-delete.component';
import { CustomerCreateAppointmentComponent } from './pages/customer-home/customer-create-appointment/customer-create-appointment.component';
import { CustomerViewComponent } from './pages/customer-home/customer-view/customer-view.component';
import { ApptDeleteComponent } from './pages/employee-options/appt-delete/appt-delete.component';
import { ApptCreateComponent } from './pages/employee-options/appt-create/appt-create.component';
// import { ApptViewComponent } from './pages/employee-options/appt-view/appt-view.component';
import { ApptEditComponent } from './pages/employee-options/appt-edit/appt-edit.component';
import { ApptSearchComponent } from './pages/employee-options/appt-search/appt-search.component';
import { ServiceSearchComponent } from './pages/employee-options/service-search/service-search.component';
import { ServiceCreateComponent } from './pages/employee-options/service-create/service-create.component';
import { ServiceEditComponent } from './pages/employee-options/service-edit/service-edit.component';
import { ServiceViewComponent } from './pages/employee-options/service-view/service-view.component';
import { ServiceDeleteComponent } from './pages/employee-options/service-delete/service-delete.component';
import { ApptViewComponent } from './pages/employee-options/appt-view/appt-view.component';
import { CustSearchComponent } from './pages/employee-options/cust-search/cust-search.component';


const routes: Routes = [
    {path: 'home', title: 'home', component: HomeComponent, pathMatch: 'full'},
    {path: 'about', title: 'About',component: AboutUsComponent},
    {path: 'services', title: 'Service',component: ServicesComponent},
    {path: 'contact', title: 'Contact',component: ContactComponent},
    {path: 'login', title: 'login',component: loginComponent},
    {path: 'register', title: 'register',component: registerComponent},
    {path: 'logout', title: 'logout',component: LogoutComponent},

   
    {path: 'employee-appt', title: 'employee-appt',component: EmployeeApptComponent, canActivate:[AuthGuard] },
    //=================================================
    //          employee options
    //=================================================

    {path: 'employee-delete', title: 'employee-delete',component: EmployeeDeleteComponent, canActivate:[AuthGuard] },
    {path: 'employee-view', title: 'employee-view',component: EmployeeViewComponent, canActivate:[AuthGuard] },
    {path: 'employee-edit', title: 'employee-edit',component: EmployeeEditComponent, canActivate:[AuthGuard] },
    {path: 'employee-search', title: 'employee-search',component: EmployeeSearchComponent, canActivate:[AuthGuard] },
    {path: 'employee-create', title: 'employee-create',component: EmployeeCreateComponent, canActivate:[AuthGuard] },

    {path: 'cust-create', title: 'cust-create',component: CustCreateComponent, canActivate:[AuthGuard] },
    {path: 'cust-search', title: 'cust-search',component: CustSearchComponent, canActivate:[AuthGuard] },
    {path: 'cust-edit', title: 'cust-edit',component: CustEditComponent, canActivate:[AuthGuard] },
    {path: 'cust-view', title: 'cust-view',component: CustViewComponent, canActivate:[AuthGuard] },
    {path: 'cust-delete', title: 'cust-delete',component: CustDeleteComponent, canActivate:[AuthGuard] },

    {path: 'appt-delete', title: 'appt-delete',component: ApptDeleteComponent, canActivate:[AuthGuard] },
    {path: 'appt-create', title: 'appt-create',component: ApptCreateComponent, canActivate:[AuthGuard] },
    {path: 'appt-view', title: 'appt-view',component: ApptViewComponent, canActivate:[AuthGuard] },
    {path: 'appt-edit', title: 'appt-edit',component: ApptEditComponent, canActivate:[AuthGuard] },
    {path: 'appt-search', title: 'appt-search',component: ApptSearchComponent, canActivate:[AuthGuard] },
    
    {path: 'service-search', title: 'service-search',component: ServiceSearchComponent, canActivate:[AuthGuard] },
    {path: 'service-create', title: 'service-create',component: ServiceCreateComponent, canActivate:[AuthGuard] },
    {path: 'service-edit', title: 'service-edit',component: ServiceEditComponent, canActivate:[AuthGuard] },
    {path: 'service-view', title: 'service-view',component: ServiceViewComponent, canActivate:[AuthGuard] },
    {path: 'service-delete', title: 'service-delete',component: ServiceDeleteComponent, canActivate:[AuthGuard] },
    
    
   //================================================
   //           customer
   //================================================

   {path: 'customer-create-appointment', title: 'customer-create-appointment',component: CustomerCreateAppointmentComponent, canActivate:[AuthGuard] },
   {path: 'customer-view', title: 'customer-view',component: CustomerViewComponent, canActivate:[AuthGuard] },
  
    

    {path: '', redirectTo: '/index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

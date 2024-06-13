import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-customer-create-appointment',
  templateUrl: './customer-create-appointment.component.html',
  styleUrls: ['./customer-create-appointment.component.css']
})
export class CustomerCreateAppointmentComponent implements OnInit  {
    loggedInUser?: any;
    customerId?: number;
    services?: any;
    srvcEmployees?: any;

  constructor(private authService: AuthService, 
              private apptService: ServiceService,
              private router: Router) 
   { }
 @ViewChild('bookAppointmentForm') bookAppointmentForm?:NgForm;

  ngOnInit() {
    this.authService.getCurrentUser(()=>{
      this.loggedInUser = this.authService.loggedInUser;
      console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
      this.customerId = this.loggedInUser['id'];
      });
    this.fetchServices();
  }


  submitForm(oForm: NgForm) {
    console.log(`LoggedInUser: ${JSON.stringify(this.loggedInUser)} `)
    oForm.value.customer_id = this.loggedInUser.id;
    console.log(`formValues: ${JSON.stringify(oForm.value)} `)
    this.apptService.createCustomerAppointment(oForm.value).subscribe(
      (res) => {
        if(res['status'] ==='success') {
            this.router.navigate(['/customer-home']);
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    // Handle form submission logic here
    console.log('Form submitted');
}


selectedService?: number | string;
selectedServiceData?: any;
onServiceChanged(service: any){
  console.log(`selectedservice: ${JSON.stringify(service)}`);
  this.selectedServiceData = this.searchService(service, this.services);
  console.log(`selectedserviceData: ${JSON.stringify(this.selectedServiceData)}`);
  console.log(`selectedserviceData: ${JSON.stringify(this.searchService(service, this.services))}`);

  this.fetchServiceEmployee (this.selectedServiceData.id)
  // this.srvcEmployees = 
}
//function to search array of services
searchService(id: number, myArray: any) : any {
  // console.log(`myArray: ${JSON.stringify(myArray)} id: ${id}`);
  for(var i = 0; i < myArray.length; i++) {
    // console.log(`myArray: ${JSON.stringify(myArray[i])} id: ${id}`);
    if(myArray[i].id == id) {
      return myArray[i];
    }
  }
}
fetchServices() {
  this.apptService.getAllServices().subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.services = res['data']!['services'];
          console.log(`services: ${JSON.stringify(this.services)}`)
        }
    },
    (err)=> {
      // console.log(err);
    }
  )
}
fetchServiceEmployee(id: number) {
  this.apptService.getAllEmployeeService(id).subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.srvcEmployees = res['data']!['srvc_employees'];
          console.log(`srvcEmployees: ${JSON.stringify(this.srvcEmployees)}`)
        }
    },
    (err)=> {
      // console.log(err);
    }
  )
}
}

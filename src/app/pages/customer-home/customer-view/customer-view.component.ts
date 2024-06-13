import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit{
  appointments: any;
  customerId: number = 0;
  loggedInUser?: any;
  user?: any;

constructor ( private serviceService: ServiceService, 
              private authService: AuthService,
              
){ }

  ngOnInit(): void {
    this.authService.getCurrentUser(()=>{
      this.loggedInUser = this.authService.loggedInUser;
      console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
      this.customerId = this.loggedInUser['id'];
    this.fetchListOfAppointments();
    });
  }
  fetchListOfAppointments(){
   
    this.serviceService.getAllCustomerAppointments(this.customerId).subscribe(
      (res) =>{
          if(res['status'] === 'success') {
            this.appointments = res['data']!['appointments'];
            
          }
      },
      (err)=> {
        // console.log(err);
      }
    )
  }
}

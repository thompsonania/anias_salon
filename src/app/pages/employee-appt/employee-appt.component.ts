import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-appt',
  templateUrl: './employee-appt.component.html',
  styleUrls: ['./employee-appt.component.css']
})
export class EmployeeApptComponent implements OnInit {
  appointments: any;
  employeeId: number = 0;
  loggedInUser?: any;
  // user?: any;

  constructor ( private serviceService: ServiceService, 
    private authService: AuthService
){ }



 
ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.employeeId = this.loggedInUser['id'];
  this.fetchListOfAppointments();
  });
}
fetchListOfAppointments(){
 
  this.serviceService.getAllemployeeAppointments(this.employeeId).subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.appointments = res['data']!['appointments'];
          
        }
    },
    (err)=> {
      console.log(err);
    }
  )
}
}








  

import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appt-create',
  templateUrl: './appt-create.component.html',
  styleUrls: ['./appt-create.component.css']
})
export class ApptCreateComponent implements OnInit{

appointments: any;
employeeId: number = 0;
loggedInUser?: any;

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

this.serviceService.getAllAppointments().subscribe(
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
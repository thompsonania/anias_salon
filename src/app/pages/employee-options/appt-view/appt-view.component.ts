import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appt-view',
  templateUrl: './appt-view.component.html',
  styleUrls: ['./appt-view.component.css']
})
export class ApptViewComponent implements OnInit {
  appointments: any;
  appointmentId: number = 0;
  loggedInUser?: any;
  // user?: any;

constructor ( private serviceService: ServiceService, 
              private authService: AuthService
){ }
 

ngOnInit(): void {
this.authService.getCurrentUser(()=>{
  this.loggedInUser = this.authService.loggedInUser;
  console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
  this.appointmentId = this.loggedInUser['id'];
this.GetAllAppointments();
});
}
GetAllAppointments(){

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
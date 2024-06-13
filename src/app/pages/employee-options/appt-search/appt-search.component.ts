import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appt-search',
  templateUrl: './appt-search.component.html',
  styleUrls: ['./appt-search.component.css']
})
export class ApptSearchComponent implements OnInit{
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
this.fetchListOfAppointments();
});
}
fetchListOfAppointments(){

this.serviceService.deleteAppointment(this.appointmentId).subscribe(
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
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-appt-edit',
  templateUrl: './appt-edit.component.html',
  styleUrls: ['./appt-edit.component.css']
})
export class ApptEditComponent implements OnInit {

    appointments: any;
    appointmentId: number = 0;
    loggedInUser?: any;
  
      constructor ( private serviceService: ServiceService, 
                    private authService: AuthService,
                    private router: Router
  ){ }



ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.appointmentId = this.loggedInUser['id'];
  // this.fetchUpdateappointment();
  });
}
fetchUpdateappointment(oForm: NgForm){
 
  this.serviceService.updateAppointment(this.appointmentId, oForm.value).subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.appointmentId = res['data']!['appointmentId'];
          
        }
    },
    (err)=> {
      console.log(err);
    }
  )
}
}

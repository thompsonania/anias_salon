import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-service-delete',
  templateUrl: './service-delete.component.html',
  styleUrls: ['./service-delete.component.css']
})
export class ServiceDeleteComponent implements OnInit {
  services: any;
  serviceId: number = 0;
  loggedInUser?: any;
    
    constructor ( private serviceService: ServiceService, 
                  private authService: AuthService,
                  private router: Router
){ }


ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.serviceId = this.loggedInUser['id'];
  this.fetchListOfservices();
  });
}
fetchListOfservices(){
 
  this.serviceService.deleteService(this.serviceId).subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.serviceId = res['data']!['serviceId'];
          
        }
    },
    (err)=> {
      console.log(err);
    }
  )
}
}
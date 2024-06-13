import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cust-delete',
  templateUrl: './cust-delete.component.html',
  styleUrls: ['./cust-delete.component.css']
})
export class CustDeleteComponent implements OnInit{
  
    customers: any;
    customerId: number = 0;
    loggedInUser?: any;
      
      constructor ( private customerService: CustomerService, 
                    private authService: AuthService,
                    private router: Router
  ){ }

ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.customerId = this.loggedInUser['id'];
  this.fetchListOfCustomers();
  });
}
fetchListOfCustomers(){
 
  this.customerService.deleteCustomer(this.customerId).subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.customerId = res['data']!['customerId'];
          
        }
    },
    (err)=> {
      console.log(err);
    }
  )
}
}
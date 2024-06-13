import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cust-edit',
  templateUrl: './cust-edit.component.html',
  styleUrls: ['./cust-edit.component.css']
})
export class CustEditComponent implements OnInit {
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
  // this.getSingleCustomerbyId();
  });
}
FetchUpdateCustomer(oForm: NgForm){
 
  this.customerService.updateCustomer(this.customerId, oForm.value).subscribe(
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
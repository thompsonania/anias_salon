import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit{
  // appointments: any;
  employees: any;
  employeeId: number = 0;
  loggedInUser?: any;
  // user?: any;
    
    constructor ( private employeeService: EmployeeService, 
                  private authService: AuthService,
                  private router: Router
){ }


ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.employeeId = this.loggedInUser['id'];
  this.fetchListOfEmployees();
  });
}
fetchListOfEmployees(){
 
  this.employeeService.getAllEmployees().subscribe(
    (res) =>{
        if(res['status'] === 'success') {
          this.employeeId = res['data']!['employeeId'];
          
        }
    },
    (err)=> {
      console.log(err);
    }
  )
}
}
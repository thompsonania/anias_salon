import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
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
  this.fetchSingleEmployee();
  });
}
fetchSingleEmployee(){
 
  this.employeeService.getSingleEmployee(this.employeeId).subscribe(
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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employees: any;
  employeeId: number = 0;
  loggedInUser?: any;

    constructor ( private employeeService: EmployeeService, 
                  private authService: AuthService,
                  private router: Router
){ }
  

ngOnInit(): void {
  this.authService.getCurrentUser(()=>{
    this.loggedInUser = this.authService.loggedInUser;
    console.log(`LOGGEDINUSER: ${JSON.stringify(this.loggedInUser)}`)
    this.employeeId = this.loggedInUser['id'];
  this.fetchDeleteEmployee();
  });
}
fetchDeleteEmployee(){
 
  this.employeeService.deleteEmployee(this.employeeId).subscribe(
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
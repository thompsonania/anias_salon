import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
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
  // this.fetchUpdateEmployee();
  });
}
fetchUpdateEmployee(oForm: NgForm){
 
  this.employeeService.updateEmployee(this.employeeId, oForm.value).subscribe(
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

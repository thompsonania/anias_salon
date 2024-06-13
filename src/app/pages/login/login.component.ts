import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent {
  hasError: boolean = false;
  errorMessage: string = '';
  user: any;
  
  constructor(private authService: AuthService, 
              private router: Router,) { }
              private customerLink = '/customer-view';
              // private employeeLink = '/employee-appt';
              // private adminLink = '/appt-view';
              // currentRole: string = '';

              

  ngOnInit(): void {

  }
  login(oform: NgForm): void {
    this.authService.login(oform.value).subscribe(
      (res) => {
        if(res['status'] ==='success'){
          this.authService.authToken = res['data']!['token'];
          this.authService.saveAuthToken();
          this.authService.getCurrentUser(() => {
            this.user = this.authService.currentUser;
            // this.currentRole = this.user.role;
            console.log(`USER DATA: ${JSON.stringify(this.user)}`);
            if(this.user['role'] == 'Customer'){
              alert('Logging in as customer');
              this.router.navigateByUrl('/home');
            }
            else if(this.user['role'] == 'stylist'){
              alert('Logging in as stylist');
              this.router.navigateByUrl('/employee-appt');
            }
            else if(this.user['role'] == 'admin'){
              alert('Logging in as admin');
              this.router.navigateByUrl('/employee-appt');
            }
          });
          // if(this.user.role === 'customer'){
          // this.router.navigate(['customer-view']);
        //   }else{
        //     this.router.navigate(['/employeeLink']);
        //   }
        // }else if(['/adminLink']){
        }

      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
        // console.log(err);
      }
    )
    
  
}
}

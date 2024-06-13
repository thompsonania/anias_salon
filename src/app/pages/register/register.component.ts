import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent {
  constructor(private authService: AuthService, 
              private router: Router){}
            ngOnInit(): void {

            }

register(oForm: NgForm){
  

  oForm.value.role = 'customer';
  console.log(oForm.value)
  
this.authService.register(oForm.value).subscribe(res => {
        if(res['status']=='success'){
          alert('successfully registered')
          this.router.navigateByUrl('/home');
        }else{
          alert({
            icon: 'error',
            title: 'Failed To Register',
          });
        }
    });
}
}
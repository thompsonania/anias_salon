import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
    isLoggedIn?: boolean = false;
    loginText: string = 'Login';
    loginLink: string = '/login';
    // registerLink: string = '/login';

    constructor ( private router: Router, private authService: AuthService){ }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.isLoggedIn = true;
      this.loginText = 'Logout';
      this.loginLink = '/logout'
    }else{
      this.isLoggedIn = false;
      this.loginText = 'Login';
      this.loginLink = '/login';
    }
  }

}

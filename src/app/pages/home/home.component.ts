import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string []= ["Amanda Allen", "Terrian Salmon"]; 
  description: string []= ["With over 10 years of experience, Amanda specializes in modern cuts and colors. She mainly specializes in coloring and styling",
  "Terrian has a passion for classic styles and precise cuts, ensuring you leave feeling confident. She mainly specializes in men haircuts, wedding hairstyles and updos"]
    
myEvent = "";
  newClass = "";
  headingClass= "";
  boolVal: boolean= false;
  isHidden = false;
  
  
  buttonClick(): void{
    this.myEvent = "button Clicked";
  // }
  // mouseOut() : void{
  //   this.newClass = "mouseOver";
  //   this.headingClass ="heading";
  //   this.isHidden = true;
  //   this.boolVal= true;
  // }
  
  // mouseOver(): void{
  //   this.headingClass= "";
  //   this.newClass= "";
  //   this.isHidden = false;
  //   this.boolVal= false;
  }

}
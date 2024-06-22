import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {

  constructor(private service: SellerService,private route:Router) { }
  showLogin=true;
  authError:string='';
  ngOnInit(): void {
    this.service.reloadSeller();
  }
  signup(data: NgForm){
    // console.warn(data);
    // this.service.userSignUp(data.value).subscribe((result) => {
    //   console.warn(result);
    //   if(result){
    //     this.route.navigate(['seller-home'])
    //   }
    // });
    this.service.userSignUp(data.value);
    
  }
  openLogin(){
    this.showLogin=false;
  }
  openSignup(){
    this.showLogin=true;
  }
  login(data: NgForm){
    // console.log(data.value);
    this.service.userLogin(data.value);
    this.service.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError='Email & password is invalid';
      }
     
    })

    
  }

}

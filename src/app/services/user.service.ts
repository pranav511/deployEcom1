import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../interface/seller.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }

  SignUp(data: SignUp) {
    this.http.post('http://localhost:3000/users', data, { observe: 'response' }).
      subscribe((result) => {
        //this.isSellerLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(result.body));
       this.route.navigate(['/']);
         //console.warn('result', result);
      });
  }//
  Login(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result)=>{
      if(result && result.body && result.body.length){
        this.isLoginError.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }
      else{
        this.route.navigate(['/user-auth']);
        this.isLoginError.emit(true);

      }
    })
  }//
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
    
  }



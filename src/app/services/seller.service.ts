import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, SignUp } from '../interface/seller.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/sellers', data, { observe: 'response' }).
      subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.route.navigate(['/seller-home']);
        // console.warn('result', result);
      });
  }//

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }else if(localStorage.getItem('sellers')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['/seller-home']);
    }
  }

  userLogin(data:Login){
    // console.log(data.email);
    // console.log(data.password);
    this.http.get(`http://localhost:3000/sellers?email=${data.email}&password=${data.password}`,
    {observe:'response'}).
    subscribe((result:any)=>{
      // console.warn(result);
      if(result && result.body && result.body.length){
        // console.warn("user logged in...");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.route.navigate(['/seller-home']);
        
      }else{
        // consoles.warn('Logged failed');
        this.isLoginError.emit(true);
      }
      
    })
  }
}//

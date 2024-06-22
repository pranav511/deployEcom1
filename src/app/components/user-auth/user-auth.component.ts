import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  SuccsssMsg: string | undefined;
  errorMsg: string | undefined;
  authError: string = '';
  productQuantity:number=0;

  constructor(private service: UserService,private productService:ProductService) { }

  ngOnInit(): void {
    this.service.userAuthReload();
  }
  signUp(data: SignUp) {
    // console.log(data);
    this.service.SignUp(data);
  }
  openSignup() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }


  login(data: Login) {
    // console.log(data);
    this.service.Login(data);
    this.service.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email & password is invalid';
      }
      else{
        this.localCartToRemoteCart();
      }

    })
  }
  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(data){
      let cartDataList:Product[]=JSON.parse(data);

      cartDataList.forEach((product:Product,index) => {
        let cartData:Cart={
          ...product,
          productId:product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Item stored in Db");
              
            }
          })
          
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart');
        }
       
      });
    }
setTimeout(() => {
  this.productService.getCartList(userId)

}, 200);  }
 
  
}

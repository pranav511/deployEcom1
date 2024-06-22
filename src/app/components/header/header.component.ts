import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | Product[];
  cartItem:number=0;
  constructor(private route: Router, private service: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // console.warn(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore);
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          console.log(this.userName);
          
          this.menuType='user';
          this.service.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    let cartData=localStorage.getItem('localCart')
    if(cartData){
      this.cartItem=JSON.parse(cartData).length;
    }
    this.service.cardData.subscribe((items)=>{
      this.cartItem=items.length;
    })

  }
  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  UserLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.service.cardData.emit([]);
  }
  search(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.service.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
        this.route.navigate([`search/${element.value}`]);
       console.log(this.searchResult);
  

      })

    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    
    // this.route.navigateByUrl('/search/',);

      this.route.navigate([`search/${val}`]);
      console.log(val+"s");
    // this.route.navigate(['/']);
  }


}

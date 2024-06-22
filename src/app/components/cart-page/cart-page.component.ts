import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Cart, summaryPrice } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: Cart[] | undefined;
  priceSummary:summaryPrice={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0,
  }
  constructor(private productService: ProductService,private route:Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }
loadDetails(){this.productService.currentCart().subscribe((result) => {
  //console.log(result);
  this.cartData=result;
  let price=0;
  result.forEach((item)=>{
    if(item.quantity){
      price=price+ (+item.price*item?.quantity);
    }
    
  });    
 
    
    if(!this.cartData.length){
      this.route.navigate(['/']);
      console.log(this.cartData.length);
      
    }
    else{
      this.priceSummary.price=price;
      this.priceSummary.delivery=100;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.total=price+(price/10)+100-(price/10);
      console.log(this.priceSummary.total);
    }
  

})}

  onCheck(){
    this.route.navigate(['/checkout']);
  }
  removeToCart(cartId:number | undefined){
    cartId && this.cartData && this.productService.removeToCarts(cartId)
    .subscribe((result) => {
     this.loadDetails();
    
    })
  }

}

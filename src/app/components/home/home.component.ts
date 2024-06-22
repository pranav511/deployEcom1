import { Component, OnInit } from '@angular/core';
import { Cart, Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	images = './assets/images/box1_image.jpg'
  papularProducts:undefined | Product[];
  trendyProducts:undefined | Product[];
  activeRoute: any;
   productData: undefined | Product;
  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.service.papularProduct().subscribe((result)=>{
      // console.warn(result);
      this.papularProducts=result;
    })
    this.service.trendyProduct().subscribe((result)=>{
      // console.warn(result);
      this.trendyProducts=result;
    })
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    // console.log(productId);
    productId && this.service.getProduct(productId).subscribe((result) => {
      this.productData = result;
  })
}
  AddToKart() {
    if (this.productData) {
      if (!localStorage.getItem('user')) {
        //console.log(this.productData);
        this.service.localAddToCart(this.productData)
       
      }
      else {
        //console.log('user logged in !..');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        //console.log(userId);
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        //console.log(cartData);
        this.service.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.service.getCartList(userId);
            
          }
        })



      }
    }
  }

}

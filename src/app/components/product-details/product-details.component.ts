import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Cart, Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartData: Product | undefined;
  constructor(private activeRoute: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    // console.log(productId);
    productId && this.service.getProduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;

        }
      }

      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).id;
        this.service.getCartList(userId)
        this.service.cardData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
          else {
            this.removeCart = false;
          }
        })
      }
    })

  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToKart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        //console.log(this.productData);
        this.service.localAddToCart(this.productData)
        this.removeCart = true;
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
            this.removeCart = false;
          }
        })



      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.service.removeItemFromCart(productId);
      this.removeCart = false;
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      //console.warn(this.cartData);
      this.cartData && this.service.removeToCarts(this.cartData.id)
        .subscribe((result) => {
          if (result) {
            this.service.getCartList(userId);

          }
        })


    }
    this.removeCart = false;


  }


}

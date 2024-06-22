import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, order } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item?.quantity);
        }

      });
      if (price == 0) {
        this.totalPrice = 0;
      }
      else {

        this.totalPrice = price + (price / 10) + 100 - (price / 10);
        console.log(this.totalPrice);
      }

    })
  }
  orderedNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id)

        }, 700);
      });
      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = 'Your order has been placed..'
          setTimeout(() => {
            this.route.navigate(['/my-orders'])
            this.orderMsg = undefined;
          }, 4000);
        }
      })

    }

  }
}

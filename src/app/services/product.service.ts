import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, order } from '../interface/seller.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cardData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }//
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }//
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }//

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }//

  updateProduct(product: Product) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }//
//-------------------------23-4-24----------------
  
  papularProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=10`);
  }//
  trendyProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=100`);
  }//
  searchProduct(querry: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${querry}`);
  }
  searchProducts(querry: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${querry}`);
  }

  //-------------------24-4-24----------------
  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cardData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cardData.emit(cartData);
    }

  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) =>
        productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cardData.emit(items);

    }
  }
  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/carts', cartData);
  }//
  getCartList(userId: number) {
    return this.http.get<Product[]>('http://localhost:3000/carts?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        console.log(result);

        if (result && result.body) {
          this.cardData.emit(result.body) 
        }
      })
  }//

  removeToCarts(cardId: number) {
    return this.http.delete(`http://localhost:3000/carts/${cardId}`);
  }//

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('http://localhost:3000/carts?userId' + userData.id)
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }//
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    //console.log(userData.id);
    return this.http.get<order[]>('http://localhost:3000/orders?id ' + userData.id);
  }//

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/carts/'+cartId,{observe:'response'}).subscribe((result) => {
      if (result) {
        this.cardData.emit([]);
      }
    })
  }

  cancleOrder(orderId:number){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }//
}



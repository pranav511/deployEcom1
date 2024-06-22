import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderData:order[]| undefined;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.orderList().subscribe((result)=>{
      this.orderData=result;
      console.log(this.orderData);
      console.log(result);
      
    })
   
  }
  cancleOrder(orderId:number |undefined){
    orderId && this.productService.cancleOrder(orderId).subscribe((result)=>{
      this.getOrderList();
      
    })
  }
  getOrderList(){
    this.productService.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}

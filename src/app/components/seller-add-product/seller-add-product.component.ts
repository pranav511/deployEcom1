import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private service:ProductService) { }
  showMsgDiv:string | undefined;
  ngOnInit(): void {
  }
  addProducts(data:NgForm){
    console.warn(data.value);
    this.service.addProduct(data.value).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.showMsgDiv='Product Added succesfully...';
      }
      setTimeout(() => {
        this.showMsgDiv=undefined
      }, 3000);
    });
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | Product[];
  deleteMsg:string ='';
  iconDelete=faTrash;
  iconUpdate=faEdit;
  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.listProduct();
    
  }
  deleteProduct(id:number){
    this.service.deleteProduct(id).subscribe((result)=>{
      // console.warn(result);
      if(result){
        this.deleteMsg='Product delete successfully..'
        this.listProduct();
      }setTimeout(() => {
        this.deleteMsg='';
      }, 3000);
      
    });
    
  }

  listProduct(){
    this.service.productList().subscribe((result)=>{
      // console.warn(result);
      this.productList=result;
    })

  }


}

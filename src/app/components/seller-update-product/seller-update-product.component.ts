import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  updateProductMsg:string='';

  constructor(private route: ActivatedRoute, private service: ProductService,private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.warn(productId);
    productId && this.service.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })

  }

  submit(data: Product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    this.service.updateProduct(data).subscribe((result)=>{
      this.updateProductMsg='Product updated successfully..';
    })
    setTimeout(() => {
      this.updateProductMsg='';
      this.router.navigate(['/seller-home'])
    }, 3000);
  }
}

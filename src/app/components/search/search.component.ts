import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/seller.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searcProduct:undefined | Product[];
  constructor(private activeRoute:ActivatedRoute,private service :ProductService) { }

  ngOnInit(): void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    
    // console.log('a',query);
    query && this.service.searchProduct(query).subscribe((result)=>{
      
      if(result){
        this.searcProduct=result;
      }
      else{
        this.searcProduct=undefined;
      }
      console.log(this.searcProduct);
      
    })
  }

}

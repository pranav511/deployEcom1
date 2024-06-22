import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrderComponent } from './components/my-order/my-order.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'sell-auth',component:SellersComponent},
  {path:'seller-home',component:SellerHomeComponent, canActivate:[AuthGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-orders',component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

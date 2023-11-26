import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,
  children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren:()=>import("./admin/components/customers/customer.module").then(module=>module.CustomerModule)},
    {path:"products",loadChildren:()=>import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate:[authGuard]},
    {path:"orders",loadChildren:()=>import("./admin/components/orders/order.module").then(module=>module.OrderModule),canActivate:[authGuard]},
    {path:"dashb",loadChildren:()=>import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate:[authGuard]},
  ],canActivate:[authGuard]},
  /*Eger ki angular uygulamasında admin e yani layout component e bir istek gelirse oncelikle verilen guard yapılanmasını calıstır.
  Ardından sonuc olarak true bir deger donuyorsak hedef component i tetikle. Izım vermiyorsak da ona gore davranısı belirle demis olduk.*/
  {path:"",component:HomeComponent},
  {path:"basket",loadChildren:()=>import("./ui/components/baskets/baskets.module").then(module=>module.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

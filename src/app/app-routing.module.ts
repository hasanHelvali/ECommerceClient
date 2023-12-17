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
  {path:"",component:HomeComponent},
  {path:"basket",loadChildren:()=>import("./ui/components/baskets/baskets.module").then(module=>module.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"products/:pageNo",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},
  {path:"password-reset",loadChildren:()=>import("./ui/components/password-reset/password-reset.module").then(module=>module.PasswordResetModule)},
  {path:"update-password:/userId:/resetToken",loadChildren:()=>import("./ui/components/update-password/update-password.module").then(module=>module.UpdatePasswordModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

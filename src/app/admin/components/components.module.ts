import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModule } from './customers/customer.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.direcitve.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerModule,
    ProductsModule,
    OrderModule,
    DashboardModule,
  ]
})
export class ComponentsModule { }

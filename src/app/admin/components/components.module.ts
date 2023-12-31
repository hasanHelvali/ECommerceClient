import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModule } from './customers/customer.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.direcitve.module';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CustomerModule,
    ProductsModule,
    OrderModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule,
    UserModule,
    MatTableModule
  ]
})
export class ComponentsModule { }

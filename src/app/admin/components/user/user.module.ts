import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.direcitve.module';
import { DialogModule } from '@angular/cdk/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      {path:"",component:UserComponent}
    ])
  ]
})
export class UserModule { }

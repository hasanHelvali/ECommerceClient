import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    MatSidenavModule

  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }

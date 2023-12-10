import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    UiModule
  ],
  exports:[NavbarComponent,FooterComponent]
})
export class ComponentsModule { }

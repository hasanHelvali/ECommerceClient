import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    DynamicLoadComponentDirective
     
  ],
  imports: [
    RouterModule,
    CommonModule,
    UiModule
  ],
  exports:[NavbarComponent,FooterComponent]
})
export class ComponentsModule { }

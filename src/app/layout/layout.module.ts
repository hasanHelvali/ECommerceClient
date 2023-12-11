import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DynamicLoadComponentDirective } from '../directives/common/dynamic-load-component.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports:[ComponentsModule]

})
export class LayoutModule { }

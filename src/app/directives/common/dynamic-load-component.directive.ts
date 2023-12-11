import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadComponent]'
})
export class DynamicLoadComponentDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }
  //Bu directive nerede kullanılıyorsa eger viewContainerRef i oradan bu directive e gondermemiz gerekiyor.

}

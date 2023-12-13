import { Component, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  // constructor(private componentFactoryResolver:ComponentFactoryResolver) { }
  //Igili sınıf deprecated edilmistir. Bu sınıfa ıhtıyac duymadan DynamicLoadComponent yapılabilmektedir.
  constructor() { }

 async  laodComponent(component:ComponentType,viewContainerRef:ViewContainerRef){
    let _component:any=null;
    switch (component) {
      case ComponentType.BasketComponent://Eger bu component baskets component ise 
        _component=(await import("../../ui/components/baskets/baskets.component")).BasketsComponent;//Ilgili component i buraya import etmis oldum.
        break;
    }

    viewContainerRef.clear();
    // return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
    //Deprecated isleminden dolayı artık ilgili sınıf kullanılmıyor.    
    return viewContainerRef.createComponent(_component);
    //Bu sekilde yeterlidir.
  }

}

export enum ComponentType{
  BasketComponent
}

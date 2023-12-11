import { Component, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { }

 async  laodComponent(component:ComponentType,viewContainerRef:ViewContainerRef){
    let _component:any=null;
    switch (component) {
      case ComponentType.BasketComponent://Eger bu component baskets component ise 
        _component=(await import("../../ui/components/baskets/baskets.component")).BasketsComponent;//Ilgili component i buraya import etmis oldum.
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
    /*Ilgili compoenent i al. Ilgili referanslar ile coz. Bu cozulen yapıyı create et yani cogalt ve bize ver demis olduk.
    
    ViewContianerRef: Dinamik olarak yuklenecek olan component i iceirsinde barındıran contianer dir.
    Burada onemli olan nokta ise her dinamik yukleme surecinde onceki view leri clear etmemiz gerekir. Etmezsek de bazen calısabilir lakin etmekte fayda vardir.
    
    ComponentFactory: Compoennt lerin instance larini olusturmak icin kullanılann bir fabrika sınıfıdır. 

    ComponentFactoryResolver: Belirli bir component icin ComponentFactory yi resolveComponentFactory fonksiyonu ile resolve eden ve geriye bir 
    ComponentFactory nesnesi donen bir sınıftır.
    
    Tu bu yapılanmalar ile biz istediigmiz component i istedigimiz bir event te kullanabiliriz.
    */



  }

}

export enum ComponentType{
  BasketComponent
}

import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})

export class DeleteDirective{


  constructor(
    private element:ElementRef,
    private renderer:Renderer2,
    private productService:ProductService,
    private spinner:NgxSpinnerService) {
      const image=renderer.createElement("img");//Bir image nesnesi olusturuldu.
    image.setAttribute("src","../../../../../assets/delete.png");
    image.setAttribute("style","cursor:pointer")
    image.width=25;
    image.height=25;
    renderer.appendChild(element.nativeElement,image)
   }


   @Input() id:string;

   @Output() callback:EventEmitter<any>= new EventEmitter();

   @HostListener("click")//Ne zaman bu directive in kullanıldıgı nesneye tıklanırsa iste o zaman alttaki fonksiyon devreye girer.
   onClick(){
    this.spinner.show(SpinnerType.LineSpinFade);

    // Bu directive bir silme directive i oldugundan dolayı burada silme icin bir calısma yapıyoruz.
    const a:HTMLElement=this.element.nativeElement;//element bana a tag i getiriyor. Bunu elde ettim.
    const td=a.parentElement.parentElement;//ilgili urun satirini tamamen elde ettik. Simdi bunu silebiliriz.
    this.productService.delete(this.id);
    //Urunu tablodan sanal olarak kaldırmadan once silinmesi talimatını backend e gonderelim.
    $(td).fadeOut(1000,()=>{
      this.callback.emit();
    });//Tıklandıktan 1sn sonra ilgili satırı tablodan kaldırmıs olduk.
  }




}

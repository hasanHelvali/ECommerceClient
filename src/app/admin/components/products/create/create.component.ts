import { SplitInterpolation } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService , private productService:ProductService,private alertify:AlertifyService) {
    super(spinner);
  }

  create(productName:HTMLInputElement,productStock:HTMLInputElement,productPrice:HTMLInputElement){
    this.showSpinner(SpinnerType.LineSpinFade);//Burada kayıt islemi suresince spinner i baslattık. Bunu service de uygun bir yerde durduracaz.
    const createProduct:CreateProduct=new CreateProduct();
    createProduct.name=productName.value;
    createProduct.stock=+productStock.value;
    // createProduct.stock=parseInt(productStock.value); Bu sekilde de yapılabilirdi.
    createProduct.price=parseFloat(productPrice.value);

    //Model olusturuldu. Service i cagıralım.

    this.productService.createProduct(createProduct,()=>{
      this.hideSpinner(SpinnerType.LineSpinFade)
      this.alertify.message("Urun Basarıyla Eklendi.",
      {dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    })

  }
}

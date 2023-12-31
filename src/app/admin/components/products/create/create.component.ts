import { SplitInterpolation } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
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

  @Output() createdProduct:EventEmitter<CreateProduct>=new EventEmitter();
  // @Output() fileUploadOptions:Partial<FileUploadOptions>={
  //   action:"upload",
  //   controller:"products",
  //   explanation:"Resimleri Sürükleyin Veya Secin...",
  //   isAdminPage:true,
  //   accept:".png,.jpeg,.jpg,.json"
  // };



  create(productName:HTMLInputElement,productStock:HTMLInputElement,productPrice:HTMLInputElement){
    this.showSpinner(SpinnerType.LineSpinFade);//Burada kayıt islemi suresince spinner i baslattık. Bunu service de uygun bir yerde durduracaz.
    const createProduct:CreateProduct=new CreateProduct();
    createProduct.name=productName.value;
    createProduct.stock=+productStock.value;
    createProduct.price=parseFloat(productPrice.value);

    this.productService.createProduct(createProduct,()=>{
      this.hideSpinner(SpinnerType.LineSpinFade)
      this.alertify.message("Urun Basarıyla Eklendi.",
      {dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(createProduct)
    },errorMessage=>{
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });
  }
}

import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProduct } from 'src/app/contracts/listProduct';
import { ListProductImage } from 'src/app/contracts/list-product-image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  images:ListProductImage[];

  constructor(
    dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState|string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService) {
    super(dialogRef);
  }

  async ngOnInit(){
    /*Component yuklenırken bir veri cekme islemi yapılmak istenirse bu genellıkle ctor da yapılmaz. Bu gibi islemleri bu sekilde life cycle event lerde
    yapmak daha dogrudur.*/

    this.spinner.show(SpinnerType.LineSpinFade);

    this.images = await this.productService.readImages(this.data as string, ()=>this.spinner.hide(SpinnerType.LineSpinFade));
  }
  @Output() public options:Partial<FileUploadOptions>={
    accept:".png,.jpg,.jpeg,.gif",
    action:"upload",
    controller:"products",
    explanation:"Urün Resmini Seçin Veya Buraya Sürükleyin...",
    isAdminPage:true,
    queryString:`id=${this.data}`
    // queryString:"id"+this.data, seklinde de yazılabilirdi.

  };

  async deleteImage(imageId:string,event:any){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.LineSpinFade);
        await this.productService.deleteImage(this.data as string,imageId,()=>{
          this.spinner.hide(SpinnerType.LineSpinFade)
          var element=event;
          // var card = $(event.srcElement).parent().parent().fadeOut(500)
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }
}

export enum SelectProductImageState{
  CLose
}

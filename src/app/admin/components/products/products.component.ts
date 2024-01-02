import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
   constructor(private httpClientService:HttpClientService, private dialogService:DialogService) {

  }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponent:ListComponent;
  createdProduct(createdProduct:CreateProduct){
  this.listComponent.getProducts();
  }
  showProductQRCodeReading(){
    this.dialogService.openDialog({
      componentType:QrcodeReadingDialogComponent,
      data:null,
      options:{
        width:"1000px"
      },
      afterClosed:()=>{}
    })
  }
}

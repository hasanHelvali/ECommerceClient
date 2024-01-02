import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/listProduct';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';


declare var $:any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','photos','qrcode','edit','delete'];
  dataSource :MatTableDataSource<ListProduct>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    spinner:NgxSpinnerService,
    private productService:ProductService,
    private alertify:AlertifyService,
    private dialogService:DialogService
    ) {
    super(spinner);
  }
  async ngOnInit(){
    await this.getProducts();
  }

 async getProducts(){
    this.showSpinner(SpinnerType.LineSpinFade);
    const allProducts:{totalProductCount:number; products:ListProduct[]} = await  this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.LineSpinFade),
      errorMessage=>this.alertify.message(errorMessage,{
      messageType:MessageType.Error,
      position:Position.TopRight
    }))
    this.dataSource=new MatTableDataSource<ListProduct>(allProducts.products)
    this.paginator.length=allProducts.totalProductCount;
  }




  async pageChange(){
    await this.getProducts();
  }

  addProductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px"
      }

    })
  }

  showQRCode(productId:string){
    this.dialogService.openDialog({
      componentType:QrcodeDialogComponent,
      data:productId,
      afterClosed:()=>{}
    });
  }


}

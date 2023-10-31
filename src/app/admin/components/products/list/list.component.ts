import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/listProduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';


declare var $:any;//jquery talebi yapıldı.

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertify:AlertifyService) {
    super(spinner);
  }
  async ngOnInit(){
    await this.getProducts();
  }

 async getProducts(){
    this.showSpinner(SpinnerType.LineSpinFade);
    const allProducts:{totalCount:number; products:ListProduct[]} = await  this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.LineSpinFade),
      errorMessage=>this.alertify.message(errorMessage,{
      messageType:MessageType.Error,
      position:Position.TopRight
    }))
    this.dataSource=new MatTableDataSource<ListProduct>(allProducts.products)
    this.paginator.length=allProducts.totalCount;
  }

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate','updatedDate','edit','delete'];
  dataSource :MatTableDataSource<ListProduct>=null;


  async pageChange(){
    await this.getProducts();
  }


  // public delete(id:string,event){
  //   const img:HTMLImageElement=event.srcElement;
  //   $(img.parentElement.parentElement.parentElement).fadeOut(1000);

  // }
}

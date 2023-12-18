import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    spinner:NgxSpinnerService,
    private orderService:OrderService,
    private alertify:AlertifyService,
    private dialogService:DialogService
    ) {
    super(spinner);
  }
  async ngOnInit(){
    await this.getOrders();
  }
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate','completed','viewDetail','delete'];
  dataSource :MatTableDataSource<ListOrder>=null;

 async getOrders(){
    this.showSpinner(SpinnerType.LineSpinFade);
    const allOrders:{totalOrderCount:number; orders:ListOrder[]} = await  this.orderService.getAllOrders(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.LineSpinFade),
      errorMessage=>this.alertify.message(errorMessage,{
      messageType:MessageType.Error,
      position:Position.TopRight
    }))
    this.dataSource=new MatTableDataSource<ListOrder>(allOrders.orders)
    this.paginator.length=allOrders.totalOrderCount;
  }
  async pageChange(){
    await this.getOrders();
  }
  showDetail(id:string){
    this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      data:id,
      options:{
        width:"750px",
        
      }
    })
  }
}

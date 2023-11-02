import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
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
    // private productService:ProductService,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog:MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService) {
      const image=renderer.createElement("img");//Bir image nesnesi olusturuldu.
    image.setAttribute("src","../../../../../assets/delete.png");
    image.setAttribute("style","cursor:pointer")
    image.width=25;
    image.height=25;
    renderer.appendChild(element.nativeElement,image)
   }


   @Input() id:string;
   @Input() controller:string;

   @Output() callback:EventEmitter<any>= new EventEmitter();

   @HostListener("click")
   onClick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.LineSpinFade);

        const a:HTMLElement=this.element.nativeElement;
        const td=a.parentElement.parentElement;
        // await this.productService.delete(this.id);
        await this.httpClientService.delete({
          controller:this.controller,
        },this.id).subscribe(data=>{
          $(td).animate({
            opacity:0,
            left:"+=50",
            height:"toogle"
          },700,()=>{
            this.callback.emit();
            this.alertify.message("Ürün Başariyla Silinmiştir",{
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.TopRight
            })
          });
        },(errorResponse:HttpErrorResponse)=>{
          this.spinner.hide(SpinnerType.LineSpinFade);
          this.alertify.message("Beklenmeyen Bir Hata Meydana Geldi.",{
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          })
        });
      }
    });

  }

  // openDialog(afterClosed:any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width:'250px',
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if(result==DeleteState.Yes){
  //       afterClosed();
  //     }
  //   });
  // }



}

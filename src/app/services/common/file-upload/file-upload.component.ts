import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {MatDialogActions} from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
  @Input() _options:Partial<FileUploadOptions>;
  constructor(private httpClientService:HttpClientService,private alertify:AlertifyService,private toastr:CustomToastrService,
    private dialog:MatDialog, private dialogService:DialogService, private spinner:NgxSpinnerService) {
  }
  public files: NgxFileDropEntry[];


  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData:FormData=new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath)
      });
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed:()=>{
        this.spinner.show(SpinnerType.LineSpinFade)
        this.httpClientService.post({
        controller:this._options.controller,
        action:this._options.action,
        queryString:this._options.queryString,
        headers:new HttpHeaders({"responseType":"blop"})
      },fileData).subscribe(data => {
        const message:string="Dosyalar Basari Ile Yuklenmistir"
        this.spinner.hide(SpinnerType.LineSpinFade)
        if(this._options.isAdminPage){
          this.alertify.message(message,{
            dismissOthers:true,
            position:Position.TopRight,
            messageType:MessageType.Success
          });
        }else{
          this.toastr.message(message,"Basarili",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })
        }
      },(_errorResponse:HttpErrorResponse)=>{
        const message:string="Dosyalar Yuklenirken Bir Hata Olustu"
        this.spinner.hide(SpinnerType.LineSpinFade);
        if(this._options.isAdminPage){
          this.alertify.message(message,{
            dismissOthers:true,
            position:Position.TopRight,
            messageType:MessageType.Error
          });
        }else{
          this.toastr.message(message,"Basarisiz",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          })
        }
      });
    }
  });
}
}



export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString:string;
  explanation?:string;
  accept?:string;
  isAdminPage:boolean=false;

}

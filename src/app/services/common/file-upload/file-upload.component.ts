import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
  /**
   *
   */
  constructor(private httpClientService:HttpClientService,private alertify:AlertifyService,private toastr:CustomToastrService) {

  }
  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData:FormData=new FormData();
    for (const file of files) {
      const fileEntry= (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,_file.webkitRelativePath)
      });
    }

    this.httpClientService.post({
      controller:this.options.controller,
      action:this.options.action,
      queryString:this.options.queryString,
      headers:new HttpHeaders({"responseType":"blop"})
    },fileData).subscribe(data=>{
      const message:string="Dosyalar Basari Ile Yuklenmistir"
      if(this.options.isAdminPage){
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
    },(errorResponse:HttpErrorResponse)=>{
      const message:string="Dosyalar Yuklenirken Bir Hata Olustu"
      if(this.options.isAdminPage){
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
}



export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString:string;
  explanation?:string;
  accept?:string;
  isAdminPage:boolean=false;

}

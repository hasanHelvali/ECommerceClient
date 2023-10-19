import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageType, Position } from '../admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) {
  }
  // message(message:string,title:string,messageType:ToastrMessageType,position:ToastrPosition){
  //     this.toastr[messageType](message,title,{positionClass:position});
  // }

  message(message:string,title:string,toastrOptions:Partial<ToastrOptions>){
      this.toastr[toastrOptions.messageType](message,title,{positionClass:toastrOptions.position});
  }
}
export enum ToastrMessageType{
  Success="success",
  Info="info",
  Warning="warning",
  Error="error",
}

export enum ToastrPosition{
  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  TopCenter="toast-top-center",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width",
}

export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition;
}

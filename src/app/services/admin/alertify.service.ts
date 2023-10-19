import { Injectable } from '@angular/core';

declare var alertify:any;
/*Uygulamada angularjson da yuklenmis olan kutuphanelerden hangisinde bu sekilde bir komut varsa burada onu bu sekilde bind etmis
oluyorum. */

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {
  constructor() { }

  // message(message:string,messageType:MessageType,position:Position,delay:number=3,dismissOthers:boolean=false){
    //Burada ilgili parametreler bir model uzerine alındı.

    // alertify["error"]();//Bu sekilde bir kullanım yapılabilir.
  //   const msj=alertify[messageType](message);

  //   alertify.set('notifier','position',position)

  //   alertify.set('notifier','delay',delay)

  //   if(dismissOthers)
  //     msj.dismissOthers();
  // }

  message(message:string,options:Partial<AlertifyOptions>){
    //Parametre kısmında beklenen AlertifyOptions nesnesinin {...} seklinde gonderilebilmesi icin bunu partial haline getirdim.
      const msj=alertify[options.messageType](message);
      alertify.set('notifier','position',options.position)
      alertify.set('notifier','delay',options.delay)
      if(options.dismissOthers)
        msj.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export enum MessageType{
  Error ="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomCenter="bottom-center",
  BottomRight="bottom-right",
  BottomLeft="bottom-left",
}

export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.BottomRight;
  delay:number=3;
  dismissOthers:boolean=false;
}


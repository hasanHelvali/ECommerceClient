import { PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string) {}

  // private _connection: HubConnection;
  // get connection(): HubConnection {
  //   return this._connection;
  // }
  
  start(hubUrl:string) {
    hubUrl=this.baseSignalRUrl+hubUrl;
    // if (this.connection || this.connection?.state == HubConnectionState.Disconnected) {
      const builder:HubConnectionBuilder=new HubConnectionBuilder();
      const hubConnection:HubConnection=builder.withUrl(hubUrl)
        .withAutomaticReconnect().build();

      hubConnection.start()
        .then(()=>console.log("Connected"))
        .catch(error=>setTimeout(()=>this.start(hubUrl),200));

      // this._connection=hubConnection;
    // }

    // this._connection.onreconnected(connectionId=>console.log("Reconnected"));
    // this._connection.onreconnecting(error=>console.log("Reconnecting"));
    // this._connection.onclose(error=>console.log("Close Reconnection"));

    hubConnection.onreconnected(connectionId=>console.log("Reconnected"));
    hubConnection.onreconnecting(error=>console.log("Reconnecting"));
    hubConnection.onclose(error=>console.log("Close Reconnection"));
    return hubConnection;
  }
  invoke(hubUrl:string,procedureName:string,message:any,successCallBack?:(value)=>void,errorCallBack?:(error)=>void) {
    this.start(hubUrl).invoke(procedureName,message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  on(hubUrl:string,procedureName:string,callBack:(...message:any)=>void) {///... bir operatordur ve C# taki params a karsılık gelir.
    this.start(hubUrl).on(procedureName,callBack);
  }
}

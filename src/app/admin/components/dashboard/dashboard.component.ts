import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit  {
  constructor(private alertify:AlertifyService, spinner:NgxSpinnerService,private signalRService:SignalRService) {
    super(spinner);
    // signalRService.start(HubUrls.ProductHub);
    // signalRService.start(HubUrls.OrderHub);
  }
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
      alert(message)
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopRight
      })
    });

    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction,message=>{
      alert(message)
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopCenter
      })
    });
  }

}

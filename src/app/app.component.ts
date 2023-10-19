import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType } from './services/admin/alertify.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';

  /**
   *
   */
  constructor(private toastr:CustomToastrService) {

  }


  m(){
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Info,ToastrPosition.BottomCenter);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Warning,ToastrPosition.BottomFullWidth);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Error,ToastrPosition.BottomLeft);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Success,ToastrPosition.BottomRight);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Info,ToastrPosition.TopCenter);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Warning,ToastrPosition.TopLeft);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Error,ToastrPosition.TopRight);
    // this.toastr.message("Hasan Helvali","Selamun Aleykum",ToastrMessageType.Success,ToastrPosition.TopFullWidth);


    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopCenter});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopFullWidth});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopLeft});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopRight});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomCenter});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomFullWidth});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomLeft});
    this.toastr.message("Hasan Helvali","Selamun Aleykum",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight});
  }
}




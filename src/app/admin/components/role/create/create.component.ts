import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService , private roleService:RoleService,private alertify:AlertifyService) {
    super(spinner);
  }

  @Output() createdRole:EventEmitter<string>=new EventEmitter();
  // @Output() fileUploadOptions:Partial<FileUploadOptions>={
  //   action:"upload",
  //   controller:"products",
  //   explanation:"Resimleri Sürükleyin Veya Secin...",
  //   isAdminPage:true,
  //   accept:".png,.jpeg,.jpg,.json"
  // };

  create(roleName:HTMLInputElement){
    this.showSpinner(SpinnerType.LineSpinFade);//Burada kayıt islemi suresince spinner i baslattık. Bunu service de uygun bir yerde durduracaz.
    this.roleService.createRole(roleName.value,()=>{
      this.hideSpinner(SpinnerType.LineSpinFade)
      this.alertify.message("Role Başarıyla Eklendi.",
      {dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdRole.emit(roleName.value)
    },errorMessage=>{
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
    });
  }
}

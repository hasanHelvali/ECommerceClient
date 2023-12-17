import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {
  /**
   *
   */
  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private alertifyService:AlertifyService) {
    super(spinner);
    
  }
  passwordReset(email:string){
    this.showSpinner(SpinnerType.LineSpinFade)
    this.userAuthService.paswordReset(email,()=>{
      this.hideSpinner(SpinnerType.LineSpinFade)
      /*Herhangi bir saldırgan bir mail e karsılık account var mı yok mu bunun icin kontrolde bulunabilir.
      Bu yuzden sifre yenileme yaparken her ne mail girerse girsin biz kullanıcıya basarılı bir yanıt donebiliriz. 
      Bu mail e karsılık bir kullanıcı yok gibi bir yanıt donersek eger bu deneme yanılma yoluyla sistemde saldırganlar icin bir 
      acık olusturulabilir. */
      this.alertifyService.message("Mail Başarıyla Gönderilmiştir.",{
        messageType:MessageType.Notify,
        position:Position.TopRight
      })
    });
  }
}

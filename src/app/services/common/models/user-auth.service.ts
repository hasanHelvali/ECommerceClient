import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient:HttpClientService,private toastrService:CustomToastrService) { }


  async login(userNameOrEmail:string, password:string,callBackFunc?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse> = await this.httpClient.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    },{userNameOrEmail,password});

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastrService.message("Kullanıcı Girişi Bşarılı Bir Şekilde Sağlanmıştır.","Giriş Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
      })
    }
    // else
    //   this.toastrService.message("Kullanıcı Girişi Başarısızlıkla Sonuçlandı.","Giriş Başarısız",{
    //     messageType:ToastrMessageType.Error,
    //     position:ToastrPosition.TopRight
    //     });
    callBackFunc();
  }

  async googleLogin(user:SocialUser,callBackFunc?:()=>void):Promise<any>{
    const observable:Observable<SocialUser | TokenResponse> = this.httpClient.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"auth",
    },user);
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastrService.message("Google Üzerinden Giriş İşleminiz Başarı İle Sağlanmıştır.","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.BottomRight
      });
    }
    callBackFunc();

  }
}

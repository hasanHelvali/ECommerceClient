import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUser } from 'src/app/contracts/user/createUser';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MessageType } from '../../admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClientService,private toastrService:CustomToastrService) { }

  async create(user:User):Promise<CreateUser>{
    const observable:Observable<CreateUser|User> = this.httpClient.post<CreateUser|User>({
      controller:"users"
    },user);
    /*Gonderecegim tur User, bana gelecek olan tur ise CreateUser seklinde bir turdur. Lakin biz burada CreateUser yazarsak request in body si de
    bir createUser bekler. Lakin ben User gonderip bir CerateUser almak istiyorum. Bu sebeple CreateUser|User seklinde bir tur tanimi yaptım. */

    return await firstValueFrom(observable) as CreateUser;

    //Promise kodlarda duzenlemeler yapılacak.
  }


  async login(userNameOrEmail:string, password:string,callBackFunc?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse> = await this.httpClient.post<any|TokenResponse>({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password});

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);//localstorage a yani tarayıcı bellegine boyle bir deger ekledım.
      this.toastrService.message("Kullanıcı Girişi Bşarılı Bir Şekilde Sağlanmıştır.","Giriş Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
      })
    }

    callBackFunc();
  }

  async googleLogin(user:SocialUser,callBackFunc?:()=>void):Promise<any>{
    const observable:Observable<SocialUser | TokenResponse> = this.httpClient.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"users",
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

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/Entities/user';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(private userService:UserService,spinner:NgxSpinnerService,private authService:AuthService,
    private activatedRoute:ActivatedRoute,private router:Router, private socialAuthService:SocialAuthService) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      this.showSpinner(SpinnerType.LineSpinFade);
      await userService.googleLogin(user,()=>{
        this.authService.identityChech();        
        this.hideSpinner(SpinnerType.LineSpinFade);
      });
    });
  }
  async login(userNameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.LineSpinFade);
   await this.userService.login(userNameOrEmail,password,()=>{
    this.authService.identityChech();
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string = params["returnUrl"];
      //baska sayfaya gidilmek istenip login e yonlendirme yapıldıysa, gidilmek istenen sayfa returnUrl de tutulur.
      if(returnUrl)//returnUrl varsa
        this.router.navigate([returnUrl]);
        //login vs basarılı oldugunu kontrol etmistik. Simdi ise gidilmek istenen url i elde edip ilgili sayfaya yonlendirme yapıyorum.
        //zaten boyle bir url yoksa da bir yonlendirme yapmaya gerek yok. Bir islem yapmıyoruz.
    });
    this.hideSpinner(SpinnerType.LineSpinFade);
   });

  }



}

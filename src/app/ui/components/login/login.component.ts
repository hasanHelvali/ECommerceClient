import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(private userAuthService:UserAuthService,spinner:NgxSpinnerService,private authService:AuthService,
    private activatedRoute:ActivatedRoute,private router:Router, private socialAuthService:SocialAuthService) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      this.showSpinner(SpinnerType.LineSpinFade);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user,()=>{
            this.authService.identityChech();        
            this.hideSpinner(SpinnerType.LineSpinFade);
          });
          break;
        case "FACEBOOK":
          //---
        default:
          break;
      }
    });
  }
  async login(userNameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.LineSpinFade);
   await this.userAuthService.login(userNameOrEmail,password,()=>{
    this.authService.identityChech();
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string = params["returnUrl"];
      if(returnUrl)
        this.router.navigate([returnUrl]);

    });
    this.hideSpinner(SpinnerType.LineSpinFade);
   });

  }



}

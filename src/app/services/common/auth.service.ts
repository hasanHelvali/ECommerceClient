import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(spinner:NgxSpinnerService,private jwtHelper:JwtHelperService) {
  }

  identityChech(){
    const token:string=localStorage.getItem("accessToken");
    let expired:boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired=true;
    }
    _isAuthenticated=token!=null && !expired;
  }
  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

let _isAuthenticated:boolean;

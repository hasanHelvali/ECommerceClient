import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper=inject(JwtHelperService);
  const router=inject(Router);
  const toastr=inject(CustomToastrService);
  const spinner=inject(NgxSpinnerService);
  const authService=inject(AuthService);

  spinner.show(SpinnerType.LineSpinFade);
  if(!authService.isAuthenticated)
  {

    router.navigate(["login"],{queryParams:{returnUrl:state.url}})
    toastr.message("Oturum Acmanız Gerekiyor","Yetkisiz Erisim!",
    {messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
  spinner.hide(SpinnerType.LineSpinFade);//spinner
  return true;
};

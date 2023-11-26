import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

// @Injectable({
//   providedIn:"root"
// })
// export class AuthGuard implements CanActivateFn{
//   constructor() {

//   }
//   canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
//     return true;
//   }
// }
export const authGuard: CanActivateFn = (route, state) => {
  //Guard yapılanması araya girdiginde nereye gidilmek istendigini tutan yapı state dir. Bu state in url ine ulasilabilir.
  //Aynı sekilde gelinen yol ise route da tutulur. Guard a dusulen ve gidilmek istenen url ler burada ki iki yapı uzerinde tutulurlar.
  const jwtHelper=inject(JwtHelperService);
  //jwtHepler nesnesi ilgili jwt yi cozmemizi vs saglayacak olan sınıftır.

  const router=inject(Router);
  //Kullanıcıyı yonlendirmek icin Router i inject ediyorum.
  const toastr=inject(CustomToastrService);
  //Kullanıcıyı uyarmak icin ise CustomToastrService yapısını inject ettim.
  const spinner=inject(NgxSpinnerService);

  const token:string=localStorage.getItem("accessToken");//jwt local storage dan cekilir.
  /*lokal storage a accessToken olarak kaydettigim jwt yi elde ediyorum.
  Bu token expire mi degil mi? gecerli mi yoksa gecersiz mi? gercek bir jwt mi degil mi? suresi gecmis mi gecmemis mi ? seklinde kontroller
  yapmak icin bu token i elde ediyoruz. Bu kontrolleri yapabilmemiz icin ise angular jwt adlı kutuphaneden istifade etmemiz gerek.
  npm i @auth0/angular-jwt
  komutuyla ilgili kutuphaneyi projeme dahil ediyorum. Bu kutuphaneyi dahil ettikten sonra appmodule e ilgili module u eklıyorum.*/

  // const decodeToken = jwtHelper.decodeToken(token);//jwt yi decode eder.
  // const expirationDate:Date =  jwtHelper.getTokenExpirationDate(token);//expira olunacak zamanı bildirir.
  // const expired:boolean = jwtHelper.isTokenExpired(token)//Token expira olmus mu olmamıs mı bunun kontrolunu yapar.

  spinner.show(SpinnerType.LineSpinFade);

  let expired:boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch (error) {
    expired=true;
  }
  if(!token ||  expired)//bir token yoksa veya expired edilmis ise yanş yok olmus ise
  {
    router.navigate(["login"],{queryParams:{returnUrl:state.url}})//login sayfasına yonlendiriyoruz
    toastr.message("Oturum Acmanız Gerekiyor","Yetkisiz Erisim!",
    {messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })//Kullanıcıyı uyarıyoruz.
  }

  //Eger authentication isleminde bir hata yoksa
  spinner.hide(SpinnerType.LineSpinFade);//spinner
  return true;
};

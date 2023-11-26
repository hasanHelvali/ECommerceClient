import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService:AuthService, private toastr:CustomToastrService,private router:Router) {
    authService.identityChech();
  }
  signOut(){
    localStorage.removeItem("accessToken");//ilgili token i cıkıs yapılınca kaldırıyorum.
    this.authService.identityChech();//gerekli state lerin guncellenmesi icin ilgili fonksiyonu tekrardan tetikliyorum.
    this.router.navigate([""]);//cıkıs yapılınca da kullanıcıyı direkt olarak anasayfaya yonlendiriyoruz.
    this.toastr.message("Oturum Kapatılmıştır","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight});


  }
}

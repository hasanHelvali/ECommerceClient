import {Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';
import { AuthService } from 'src/app/services/common/auth.service';
import { DynamicLoadComponentService } from 'src/app/services/common/dynamic-load-component.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ComponentType } from '../../../services/common/dynamic-load-component.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true}) dynamicLoadComponentDirective:DynamicLoadComponentDirective;

  constructor(public authService:AuthService, private toastr:CustomToastrService,private router:Router,
    private dynamicLoadComponentService:DynamicLoadComponentService) {
    authService.identityChech();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityChech();
    this.router.navigate([""]);
    this.toastr.message("Oturum Kapatılmıştır","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight});
  }



  loadComponent(){
    // this.dynamicLoadComponentDirective.viewContainerRef seklinde ctor daki public referansa ulastık.
    this.dynamicLoadComponentService.laodComponent(ComponentType.BasketComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

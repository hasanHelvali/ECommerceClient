import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  state: any;
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private userService:UserService,
    private router:Router
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.LineSpinFade);
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        this.state = await this.userAuthService.verifyResetToken(
          resetToken,
          userId,
          () => {
            this.hideSpinner(SpinnerType.LineSpinFade);
          }
        );
      },
    });
  }

   updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.LineSpinFade);
    if (password != passwordConfirm){
      this.alertify.message('Şifreyi Doğrulayınız', {
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      this.hideSpinner(SpinnerType.LineSpinFade);
      return;
    }
    this.activatedRoute.params.subscribe({
      next:async params=>{
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,()=>{
          this.alertify.message("Şifer Başarıyla Güncellenmiştir.",{
            messageType:MessageType.Success,
            position:Position.TopRight
          });
          this.router.navigate(["/login"]);
        },error=>{
        });
        this.hideSpinner(SpinnerType.LineSpinFade);
      }
    })
  }
}

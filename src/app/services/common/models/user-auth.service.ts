import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClient: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunc?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      await this.httpClient.post<any | TokenResponse>(
        {
          controller: 'auth',
          action: 'login',
        },
        { userNameOrEmail, password }
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message(
        'Kullanıcı Girişi Bşarılı Bir Şekilde Sağlanmıştır.',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunc();
  }

  async googleLogin(user: SocialUser, callBackFunc?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClient.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'auth',
        },
        user
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message(
        'Google Üzerinden Giriş İşleminiz Başarı İle Sağlanmıştır.',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomRight,
        }
      );
    }
    callBackFunc();
  }

  async refreshTokenLogin(
    refreshToken: string,
    callBackFunc?: (state) => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClient.post(
      {
        action: 'refreshtokenlogin',
        controller: 'auth',
      },
      {
        refreshToken: refreshToken,
      }
    );

    try {
      const tokenResponse: TokenResponse = (await firstValueFrom(
        observable
      )) as TokenResponse;
      if (tokenResponse) {
        localStorage.setItem('accessToken', tokenResponse.token.accessToken);
        localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      }
      callBackFunc(tokenResponse ? true : false);
    } catch (error) {
      callBackFunc(false);
    }
  }

  async paswordReset(email: string, callBackFunc?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClient.post(
      {
        controller: 'auth',
        action: 'password-reset',
      },
      { email: email }
    );
    await firstValueFrom(observable);
    callBackFunc();
  }
  async verifyResetToken(
    resetToken: string,
    userId,
    callBackFunc?: () => void
  ):Promise<boolean> {
    const observable: Observable<any> = this.httpClient.post(
      {
        controller: 'auth',
        action: 'verify-reset-token',
      },
      { resetToken: resetToken, userId: userId }
    );
    const state:boolean = await firstValueFrom(observable);
    callBackFunc();
    return state;
  }
}

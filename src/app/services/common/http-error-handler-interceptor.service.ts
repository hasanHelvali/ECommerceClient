import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastr: CustomToastrService,private userAuthService:UserAuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastr.message(
              'Bu İşlemi Yapmaya Yetkiniz Bulunammaktadır.',
              'Yetkisiz İşlem',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
              
            });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastr.message(
              'Şimdilik Sunucuya Erişilemiyor. Lutfen Daha Sonra Tekrar Deneyiniz.',
              'Sunucu Hatası',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastr.message(
              'Geçersiz İstek Yapıldı.',
              'Geçersiz İstek',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastr.message(
              'Sayfa Bulunamadı.',
              'Sayfa Bulunamadı',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          default:
            this.toastr.message(
              'Beklenmeyen  Bir Hata Meydana Geldi.',
              'Hata',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            
            break;
        }
        return of(error);
      })
    );
  }
}

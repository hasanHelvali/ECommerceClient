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

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  //Herhangi bir yapının bir HttpInterceptor olabilmesi icin HttpInterceptor interface inden implemmente edilmesi gerekir.

  constructor(private toastr: CustomToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Yapılacak isteklerde araya girdigimiz zaman bu fonksiyon tetiklenecektir.
    //req yapılan istektir. next ise araya girdikten sonra devam etmemizi saglayacak nesnedir.
    //next bir Handler yani bir delegate tir. Araya girdikten sonra ilgili fonksiyonu temsil etmektedir. Bu bize araya girmeden sonra ilgili devamlılıgı saglar.

    return next.handle(req).pipe(
      catchError((error) => {
        // console.log(error);//backend i kapatıp error a sebebiyet verdik. Yakalanan error u console a yazdırdık. Error un status gibi bazı field larının oldugunu gorduk.
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
    /*Oncelikle aldıgın request i next et yani direkt olarak api ye push la demis olduk. Bununla beraber iligli handle fonskiyonu biz bir Observable dondugu icin 
    pipe la ilgili operatorleri tetiklemek isityoruz. catchError bir rxjs fonksiyonudur. Arada bir hata olursa bunu bize geri dondurur. 
    error la iceri girip iligli hatayı of ile bir Observable akısına alıyoruz. Bu hatayı return ettik.
     */
  }
  //Bu interceptor i mimariye vermemiz gerekir. Aksı halde bosuna yazmis oluruz. Uygulamanın ana module une gidelim.

  /*Uygulamada her Http surecinde hata olsun olmasın bu interceptor devreye girer. Bu yuzden intercept fonksiyonu icinde herhangi bir islem her istekte calıstırılır.
  Hata durumlarında da hatalar zaten bu ozellik sebebiyle yakalanırlar. */
}

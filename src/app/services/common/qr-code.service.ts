import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService:HttpClientService) { }

 async  generateQRCode(productId:string){
    const observable:Observable<Blob>=this.httpClientService.get({
      /*Gelecek olan yapi bir file oldugu icin -- resim dosyaları da birer file dir.-- bu sebeple blob olarak yakalamamız gerekir. */
      controller:"products",
      action:"qrcode",
      responseType:"blob"
    },productId);

    return await firstValueFrom(observable);
  }

}






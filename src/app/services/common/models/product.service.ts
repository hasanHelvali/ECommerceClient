import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:CreateProduct,successCallBack?:any, errorCallBack?:any){
    this.httpClientService.post({controller:"products"},product)
    .subscribe(result=>{
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      //Bana backend den error lar HttpErrorResponse turunden gelir. Haata alındıysa benım bu hataları handle etmem bir sekilde yakalamam gerekiyor.
      const _error:Array<{key:string,value:Array<string>}> = errorResponse.error;
      /*Backend den bana donen hatayı burada uygun bir tipin uzerine almıs olmam gerekiyor.
      Bana donen hata bir dizi olarak geliyor. Bu dizi bir key value yapısına sahip. Key string value ise bir string dizisi olarak geliyor.
      Burada typeScript in ozellilerini kullanarak kendimize ait lokal bir tur olustrumus olduk.*/
      let message="";
      _error.forEach((val,index)=>{
        val.value.forEach((v,_index)=>{
          message+=`${v} <br>`;
        });
      });
      errorCallBack(message);
      console.log(message);
      debugger

    });
  }
}

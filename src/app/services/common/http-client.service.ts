import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,
    @Inject("baseUrl")private baseUrl:string//Bu sekilde ilgili kullanmak istedigim baseUrl i providers dan Inject ile cekip string olarak elde ediyorum.
    //BaseUrl in value su burada baseUrl degiskeni uzerine alınır.
    //Artık, ilerde origin degisirse bunu uygulama bazında tum noktalarda degıstırebilme imkanına sahip oluyorum.
    )
    {
    }

    private url(requestParameters:Partial<RequestParameters>):string{
      return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}
      ${requestParameters.action ? `/${requestParameters.action}`:""}`;
      /*Bize gelen parametrelerde kendi service yapımızından mı yoksa baska bir service yapısından mı istek yapmak istiyoruz?
      Bunu belirlemek icin requestParameters da baseUrl seklinde bir alan actık. Bu alan nullable olabilir.
      Eger bu alana bir deger verildiyse o baseUrl i kullan. Verilmediyse kendi baseUrl imi kullan demis oldum. Bu ternary operatoru ile
      yapmıs oldum. Eger model deki baseUrl dolu ile ben dıs dunyadan bir service e istek yapıyorumdur. Eger dolu degilse kendi api ma istek yapıyorumdur.
      Bunun ayrımını yapmak icin boyle bir davranısa basvurdum.
      Daha sonrasında / ile vs linkimi olusturmaya devam etmis oldum. Aynı mantıgı burada da kullandım.
      Controller dan sonra bir action olabilir veya olmayabilir. Bunun ayrımını da kontrol ile yaptım. action varsa / i koysun ve action i eklesin.
       action yoksa / i koymasın "" seklinde bos gecsin demis olduk.

       Bu artık, benim client tarafımın butun isteklerinde kullanacagı url yapılanmasıdır. Haliyle bir url olusturulacaksa bu yapı kullanılabilir.*/


      }

    get<T>(requestParameters:Partial<RequestParameters>,id?:string):Observable<T>{
      let url:string="";
        if(requestParameters.fullEndPoint)
          url=requestParameters.fullEndPoint;
        //Eger bana gelen degerde fullendpoint doluysa yani baska bir endPoint e istek yapılıyorsa ilgili url e fullEndPoint i ver.
        else{
          url=`${this.url(requestParameters)}${id?`/${id}`:""}`//eger bos ise url fonksiyonunda bir url olustur. ilgili url e olusan url i ver.
        }

       return this.httpClient.get<T>(url,{headers:requestParameters.headers})
    }

    post<T>(requestParameters:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
      let url:string;
      if(requestParameters.fullEndPoint)
        url=requestParameters.fullEndPoint;
      else
        url=`${this.url(requestParameters)}`
      console.log(url);

      return this.httpClient.post<T>(url,body,{headers:requestParameters.headers})
    }

    put<T>(requestParameters:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
      let url:string;
      if(requestParameters.fullEndPoint)
        url=requestParameters.fullEndPoint;
      else
        url=`${this.url(requestParameters)}`
      return this.httpClient.put<T>(url,body,{headers:requestParameters.headers})
    }

    delete<T>(requestParameters:Partial<RequestParameters>,id:string):Observable<T>{
      let url:string
      if(requestParameters.fullEndPoint)
        url=requestParameters.fullEndPoint;
      else
        url=`${this.url(requestParameters)}/${id}`
      return this.httpClient.delete<T>(url,{headers:requestParameters.headers})

    }
}
export class RequestParameters{
  controller?:string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
  //Tum istekler icin genel kullanılabilecek yapıları burada yazmıs oldum.
}

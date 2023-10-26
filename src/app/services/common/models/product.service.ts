import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct,  } from 'src/app/contracts/listProduct';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  // createProduct(product:CreateProduct,successCallBack?:any, errorCallBack?:any){
  //   this.httpClientService.post({
  //     controller:"products"
  //   },product).subscribe( result=>{
  //     successCallBack();
  //   },(errorResponse:HttpErrorResponse)=>{
  //     const _error:Array<{key:string,value:Array<string>}> = errorResponse.error;
  //     let message="";
  //     _error.forEach((val,index)=>{
  //       val.value.forEach((_val,_index)=>{
  //         message+=`${_val} <br>`;
  //       });
  //     });
  //     errorCallBack(message);
  //   });
  // }
  createProduct(product:CreateProduct,successCallBack?:()=>void, errorCallBack?:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(
      {
        next:()=>{
          successCallBack();
        },
        error:()=>{
          (errorResponse:HttpErrorResponse)=>{
            const _error:Array<{key:string,value:Array<string>}> = errorResponse.error;
            let message="";
            _error.forEach((val,index)=>{
              val.value.forEach((_val,_index)=>{
                message+=`${_val} <br>`;
              });
            });
            errorCallBack(message);
          }}});
        }


  async read(page:number=0,size:number=5,succesCallBack?:()=>void, errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;
    products:ListProduct[]}>{
    const promiseData:Promise<{totalCount:number; products:ListProduct[]}> = this.httpClientService.get<{totalCount:number; products:ListProduct[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`,
    }).toPromise();


    promiseData.then(d=>succesCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }


  async delete(id:string){
    const deleteObservable:Observable<any> = this.httpClientService.delete<any>({controller:"products"},id)
    await firstValueFrom(deleteObservable);
  }




}

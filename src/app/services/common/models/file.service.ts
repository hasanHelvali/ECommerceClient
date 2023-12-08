import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/base-url';
@Injectable({
  providedIn: 'root'
})
export class FileService {
    constructor(private httpClient:HttpClientService) {
    }
    async getBaseStorageUrl():Promise<BaseUrl>{
       const getObservable:Observable<BaseUrl> = this.httpClient.get<BaseUrl>({
            controller:"files",
            action:"getbasestorageurl"
        });
        return await firstValueFrom(getObservable);
    }   
}

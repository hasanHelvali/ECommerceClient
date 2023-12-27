import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Menu } from 'src/app/contracts/application-configurations/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpCLientService:HttpClientService) { }
  
 async  getAuthorizeDefinitionEndpoints(){
    const observable:Observable<Menu[]>=this.httpCLientService.get<Menu[]>({
      controller:"ApplicationServices",
    });
    return await firstValueFrom(observable);
  }
}

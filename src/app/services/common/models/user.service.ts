import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUser } from 'src/app/contracts/user/createUser';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MessageType } from '../../admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClientService,private toastrService:CustomToastrService) { }

  async create(user:User):Promise<CreateUser>{
    const observable:Observable<CreateUser|User> = this.httpClient.post<CreateUser|User>({
      controller:"users"
    },user);
    /*Gonderecegim tur User, bana gelecek olan tur ise CreateUser seklinde bir turdur. Lakin biz burada CreateUser yazarsak request in body si de
    bir createUser bekler. Lakin ben User gonderip bir CerateUser almak istiyorum. Bu sebeple CreateUser|User seklinde bir tur tanimi yaptım. */

    return await firstValueFrom(observable) as CreateUser;

    //Promise kodlarda duzenlemeler yapılacak.
  }



}

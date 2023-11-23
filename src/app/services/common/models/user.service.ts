import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUser } from 'src/app/contracts/user/createUser';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClientService) { }

  async create(user:User):Promise<CreateUser>{
    const observable:Observable<CreateUser|User> = this.httpClient.post<CreateUser|User>({
      controller:"users"
    },user);
    /*Gonderecegim tur User, bana gelecek olan tur ise CreateUser seklinde bir turdur. Lakin biz burada CreateUser yazarsak request in body si de
    bir createUser bekler. Lakin ben User gonderip bir CerateUser almak istiyorum. Bu sebeple CreateUser|User seklinde bir tur tanimi yaptım. */

    return await firstValueFrom(observable) as CreateUser;
  }
}

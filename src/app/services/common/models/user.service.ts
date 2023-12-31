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
import { ListUser } from 'src/app/contracts/user/listUser';

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

  async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallBackFunc?:()=>void,errorCallBackFunc?:(error)=>void){
    const observable:Observable<any>=this.httpClient.post({
      action:"update-password",
      controller:"users"
    },{
      userId:userId,
      resetToken:resetToken,
      password:password,
      passwordConfirm:passwordConfirm
    });
    const promiseData:Promise<any> = firstValueFrom(observable);
    promiseData.then(value=>successCallBackFunc()).catch(error=>errorCallBackFunc(error))
    await promiseData;

  }
  async getAllUsers(
    page: number = 0,
    size: number = 5,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalUsersCount: number; users: ListUser[] }> {
    const observable: Observable<{
      totalUsersCount: number;
      users: ListUser[];
    }> = this.httpClient.get({
      controller: 'users',
      queryString: `page=${page}&size=${size}`,
    });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => succesCallBack())
      .catch((err) => errorCallBack(err));
    return await promiseData;
  }

  async assignRoleToUser(
    id:string,
    roles:string[],
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClient.post(
      {
        controller: 'users',
        action:"assign-role-to-user"
      },
      {
        userId:id,
        roles: roles,
      }
    );
    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>successCallBack()).catch((error)=>errorCallBack(error));
    await promiseData;
  }

  async getRolesToUser(userId:string,successCallBack?: () => void, errorCallBack?: (error) => void):Promise<string[]>{
    const observable:Observable<{userRoles:string[]}>=this.httpClient.get({
      controller:"users",
      action:"get-roles-to-user"
    },userId);

    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>successCallBack()).catch(error=>errorCallBack(error));
    return (await promiseData).userRoles;
  }

}

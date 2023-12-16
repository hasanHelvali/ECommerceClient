import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { Observable, firstValueFrom } from 'rxjs';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { SingleOrder } from 'src/app/contracts/order/single-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClientService) {}

  async create(order: CreateOrder): Promise<void> {
    const observable: Observable<any> = this.httpClient.post(
      {
        controller: 'orders',
      },
      order
    );
    await firstValueFrom(observable);
  }

  async getAllOrders(
    page: number = 0,
    size: number = 5,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalOrderCount: number; orders: ListOrder[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: ListOrder[];
    }> = this.httpClient.get({
      controller: 'orders',
      queryString: `page=${page}&size=${size}`,
    });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => succesCallBack())
      .catch((err) => errorCallBack(err));
    return await promiseData;
  }

  async getOrderById(
    id: string,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const observable: Observable<SingleOrder> = this.httpClient.get<SingleOrder>(
      {
        controller: 'orders',
      },
      id
    );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => succesCallBack())
      .catch((err) => errorCallBack(err));
    return await promiseData;
  }
}

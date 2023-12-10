import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClient: HttpClientService) {}

  async get(): Promise<ListBasketItem[]> {
    const observable: Observable<ListBasketItem[]> = this.httpClient.get({
      controller: 'baskets',
    });
    return await firstValueFrom(observable);
  }

  async add(basketItem: CreateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClient.post(
      {
        controller: 'baskets',
      },
      basketItem
    );
    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: UpdateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClient.put(
      {
        controller: 'baskets',
      },
      basketItem
    );
    await firstValueFrom(observable);
  }
  async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpClient.delete(
      {
        controller: 'baskets',
      },
      basketItemId
    );
    await firstValueFrom(observable);
  }
}

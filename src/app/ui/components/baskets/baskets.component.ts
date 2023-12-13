import { SplitInterpolation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RouteReuseStrategy, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  basketItems: ListBasketItem[] = [];
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService:OrderService,
    private toastr:CustomToastrService,
    private router:Router
  ) {
    super(spinner);
  }
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.LineSpinFade);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.LineSpinFade);
  }
  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.LineSpinFade);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = object.target.value;
    const basketItem: UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.LineSpinFade);
  }
  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.LineSpinFade);
    await this.basketService.remove(basketItemId);
    $("."+basketItemId).fadeOut(500,()=>this.hideSpinner(SpinnerType.LineSpinFade));
  }
  async shoppingComplete(){
    this.showSpinner(SpinnerType.LineSpinFade);
    const order:CreateOrder=new CreateOrder();
    order.address="Gencosman Mahallesi";
    order.description="Bu bir deneme siparisidir."
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.LineSpinFade);
    this.toastr.message("Sipariş Alınmıltır","Sipariş Oluşturuldu",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight
    })
    this.router.navigate(["/"])
  }
}

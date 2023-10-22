import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  /**
   *
   */
  constructor(private httpClientService:HttpClientService) {

  }

  ngOnInit(): void {
    this.httpClientService.get({
      controller:"products"
    }).subscribe(data=>console.log(data))

    // this.httpClientService.post(
    //   {controller:"products"},{
    //     name:"Kalem",
    //     Stock:100,
    //     price:150
    //   }
    //   ).subscribe();

    // this.httpClientService.put(
    //   {controller:"products"},{
    //     ID:"70CAEDA7-BA92-411C-BA83-08DBD30B63BB",
    //     name:"Siyah Kalem",
    //     Stock:100,
    //     price:150
    //   }
    //   ).subscribe();

    // this.httpClientService.delete({controller:"products"},"70CAEDA7-BA92-411C-BA83-08DBD30B63BB").subscribe();

    this.httpClientService.get<Product[]>({
      baseUrl:"https://jsonplaceholder.typicode.com",
      controller:"posts"
    }).subscribe(data=>{
      console.log(data)
    })

  }
}

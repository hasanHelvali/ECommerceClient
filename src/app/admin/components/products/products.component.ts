import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
   constructor(private httpClientService:HttpClientService) {

  }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponent:ListComponent;
  createdProduct(createdProduct:CreateProduct){
  this.listComponent.getProducts();
  }
}

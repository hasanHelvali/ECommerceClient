import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
// export class OrderComponent implements OnInit {
//   constructor(private spinner:NgxSpinnerService) {

//   }
//   ngOnInit(): void {
//     this.spinner.show("spinner3");


//     setTimeout(() => {
//       this.spinner.hide("spinner3");

//     }, 2000);
//   }

// }

export class OrderComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService) {
    super(spinner)
  }
 }

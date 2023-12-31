import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatDialogClose, MatDialogContent, MatDialogModule  } from '@angular/material/dialog';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge'; 
import { MatOptionModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatToolbarModule,
    FileUploadModule,
    MatBadgeModule,
    MatOptionModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxScannerQrcodeModule
  ]
  // exports:[
  //   DeleteDialogComponent,
  //   SelectProductImageDialogComponent,
  //   BasketItemRemoveDialogComponent,
  //   ShoppingCompleteDialogComponent,
  //   OrderDetailDialogComponent,
  //   CompleteOrderDialogComponent,
  //   AuthorizeMenuDialogComponent,
  // ]
})
export class DialogModule { }

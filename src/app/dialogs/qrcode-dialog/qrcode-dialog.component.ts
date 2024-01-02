import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit{
  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner:NgxSpinnerService,
    private qrCodeService:QrCodeService,
    private domSanitizer:DomSanitizer
  ) {
    super(dialogRef);
  }
  
  async ngOnInit() {
    this.spinner.show(SpinnerType.LineSpinFade);
    const qrCodeBlob:Blob =await this.qrCodeService.generateQRCode(this.data);
    const url:string =URL.createObjectURL(qrCodeBlob); 
    this.qrCodeSafeUrl =  this.domSanitizer.bypassSecurityTrustUrl(url);//Burada artık bize guvenilir bir safe url donmus olur.
    this.spinner.hide(SpinnerType.LineSpinFade);
  }
  qrCodeSafeUrl:SafeUrl;



}

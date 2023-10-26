import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinner:NgxSpinnerService ) {

  }



  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);
    // setTimeout(() => {
    //   this.hideSpinner(spinnerType);
    // }, 3000);
  }
  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType);
  }
}


export enum SpinnerType{
  BallClipRotateMultiple="spinner1",
  BallScaleMultiple="spinner2",
  LineSpinFade="spinner3"
}

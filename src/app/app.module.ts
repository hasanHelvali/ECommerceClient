import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule

  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7113/api",multi:true}
    /*Uygulamada kullanmam gereken bit baseUrl var. Bu baseUrl baska bir zaman degisebilir. Kullandıgım her yerde degismektense
    bir merkezden bunu yonetmek istiyorum. Dolayısıyla bunu providers kısmına bu sekilde ekliyorum.
    Bu url api ye istek gondermemiz icin ihtiyacımız olan url dir.
    Bundan sonra yapmamız gereken operasyonları HttpClientService de yonetmemiz gerekecek.
    Artık bu baseUrl i istedigimiz yerden DI ile cekebiliriz. */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { JwtModule } from '@auth0/angular-jwt';

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
    HttpClientModule,
    FileUploadModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        //Butun isteklerde bu token header a yerlestirilir. Araya interceptor olarak eklenir.
        allowedDomains:["localhost:7113","localhost:5113"],
        /*bir jwt ile rastgele bir api ye istek atılması cok tehlikeli bir durumdur. Ilgili konumda bu jwt elde edilirse saldırgan bu arayuzde bircok
        yere erisebilir. Bu yuzden ilgili hedef endpoint lerin belirlenmesi gerekir. Bunun icin ilgili kutuphanede allowedDomains adında bir alan
        bize sunulmustur.*/
        // disallowedRoutes hatta ozellikle gonderilmemesi gereken endpoint ler varsa onları da burada belirleyebiliyoruz.

      }
    })

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

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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import {  GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FileUploadModule,
    DialogModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7113"],
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule ,
    
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7113/api/",multi:true},
    {provide:"baseSignalRUrl",useValue:"https://localhost:7113/",multi:true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '958479602575-v6j54rnag5khs34cmgfgpf2q3kulpnv8.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

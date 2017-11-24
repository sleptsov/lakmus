import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { RestService } from './services/core/rest.service';
import { HeadersInterceptor } from './services/core/headers-interceptor';
import { ClientsModule } from './clients/clients.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClientsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { WaiterComponent } from './components/waiter/waiter.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    WaiterComponent,
    KitchenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from 'src/app/modules/order/components/order/order.component';
import { OrdersService } from './orders.service';
import { CreateOrderComponent } from './components/create-order/create-order.component';

@NgModule({
  declarations: [OrderComponent, CreateOrderComponent],
  imports: [
    CommonModule
  ],
  providers: [OrdersService]
})
export class OrderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from 'src/app/modules/order/components/order/order.component';
import { OrdersService } from './orders.service';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule
  ],
  providers: [OrdersService]
})
export class OrderModule { }

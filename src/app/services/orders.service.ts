import { Injectable } from '@angular/core';
import { OrderModule } from '../modules/order/order.module';

@Injectable({
  providedIn: OrderModule
})
export class OrdersService {
  constructor() { }
}

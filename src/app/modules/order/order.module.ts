import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from 'src/app/components/order/order.component';
import { AuthModule } from '../auth/auth.module';
@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }

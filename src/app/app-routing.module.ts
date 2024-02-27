import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { OrderComponent } from './modules/order/components/order/order.component';
import { CreateOrderComponent } from './modules/order/components/create-order/create-order.component';

const routes: Routes = [
  { path:'login', component: LoginComponent},
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'orders/create', component: CreateOrderComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

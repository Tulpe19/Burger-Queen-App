import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  { path:'login', component: LoginComponent},
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class OrdersService {

  private ordersBaseURL = 'http://localhost:8080'
  private getOrdersURL = `${this.ordersBaseURL}/orders`

  public ordersResultPage$: Observable<any>
  public ordersQuery$: BehaviorSubject<any>

  private pageSize = 20

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.ordersQuery$ = new BehaviorSubject(undefined)
    this.ordersResultPage$ = this.ordersQuery$.pipe(
      switchMap((query: { pageNumber: number }) => this.getOrders(query.pageNumber)),
      map((result) => {
        console.log(result)
        return result
      })
    )
  }

  getOrders(pageNumber: number) {
    const params = new HttpParams().set('_page', pageNumber).set('_limit', this.pageSize)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    return this.httpClient.get(this.getOrdersURL, { params, headers })
  }
}

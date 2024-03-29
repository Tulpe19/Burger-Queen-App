import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class OrdersService {

  private APIBaseURL = 'http://localhost:8080'
  private getOrdersURL = `${this.APIBaseURL}/orders`
  private getProductsURL = `${this.APIBaseURL}/products`


  public ordersResultPage$: Observable<any>
  public ordersQuery$: BehaviorSubject<any>

  private pageSize = 20

  constructor(private httpClient: HttpClient, public authService: AuthService) {
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

  getAllProducts() {
    const params = new HttpParams().set('_page', 1).set('_limit', 0)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    return this.httpClient.get(this.getProductsURL, { params, headers }).pipe(
      map((response: any) => {
        const result: any = {
          Breakfast: []
        }
        response.forEach((product: any) => {
          const category = product.type as string
          if(!(category in result)) {
            result[category] = [product]
          } else {
            result[category].push(product)
          }
        })
        return result;
      })
    )
  }
}

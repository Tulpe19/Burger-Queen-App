import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderId$: Observable<string | null> | undefined
  public orderId: string | null | undefined
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.orderId$ = this.route.paramMap.pipe(map((params) => params.get('id')))

    this.orderId = this.route.snapshot.paramMap.get('id')
  }

}

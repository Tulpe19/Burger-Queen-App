import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  public menu: any
  public categories: string[] = []
  constructor(public orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.getAllProducts().subscribe(menu => {
      this.menu = menu
      this.categories = Object.keys(menu)
      console.log({ menu, categories: Object.keys(menu)})
    })
  }

}

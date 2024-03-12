import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { Order, Product } from '../../models/order';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  public menu: any
  public categories: string[] = []
  public newOrder: Order;
  private debug: boolean = true

  constructor( private modalService:NgbModal, public authService: AuthService , public orderService: OrdersService) {
    this.newOrder = {
      id: undefined,
      userId: this.authService.userInfo.id,
      client: '',
      products: [],
      status: 'pending',
      dateEntry: undefined,
      dateProcessed: undefined,
    }
  }

  ngOnInit(): void {
    this.orderService.getAllProducts().subscribe(menu => {
      this.menu = menu
      this.categories = Object.keys(menu)
      console.log({ menu, categories: Object.keys(menu)})
    })
  }

  getProductQuantityById(productId: number) {
    return this.newOrder.products.find((productOrder) => productOrder.product.id === productId)?.qty || 0
  }

  addProduct(productId: number) {
    const productOrder = this.newOrder.products.find((productOrder) => productOrder.product.id === productId)
    const product = Object.values(this.menu).flat().find((product: any) => product.id === productId)
    if(productOrder) {
      productOrder.qty++
    } else {
      this.newOrder.products.push({ qty: 1, product: product as Product})
    }

    if(this.debug) console.log({ newOrder: this.newOrder})
  }

  removeProduct(productId: number) {
    const productOrder = this.newOrder.products.find((productOrder) => productOrder.product.id === productId)
    if(productOrder && productOrder.qty > 1) {
      productOrder.qty--
    } else if(productOrder && productOrder.qty === 1) {
      const productOrderIndex = this.newOrder.products.indexOf(productOrder)
      this.newOrder.products.splice(productOrderIndex, 1)
    }

    if(this.debug) console.log({ newOrder: this.newOrder})
  }

  //función para abrir el modal por medio del componente de ng-bootstrap
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}

  totalPrice() {
    let total = 0
    for(let productOrder of this.newOrder.products) {
      total += productOrder.qty * productOrder.product.price;
    }
    return total;
  }

}

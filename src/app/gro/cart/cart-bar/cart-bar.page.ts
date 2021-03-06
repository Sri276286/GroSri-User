import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';

@Component({
  selector: 'gro-cart-bar',
  templateUrl: 'cart-bar.page.html',
  styleUrls: ['cart-bar.page.scss']
})
export class CartBarPage implements OnInit {

  cartTotal = 0;
  cartQuantity = '';
  quantity = 0;
  storeId: string = '';
  constructor(private _cartService: CartService) { }

  ngOnInit() {
    this._cartService.cartEntity$.subscribe((cart) => {
      this.storeId = cart && ((cart.store && cart.store.id) || cart.storeId);
      this.cartTotal = cart && (cart.billTotal || cart.total);
      this.quantity = cart && cart.orderProducts && cart.orderProducts.length;
      if (this.quantity === 1) {
        this.cartQuantity = `1 item`;
      } else {
        this.cartQuantity = `${this.quantity} items`;
      }
    });
  }
}

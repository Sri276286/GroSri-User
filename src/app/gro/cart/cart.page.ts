import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {

  items = [];
  cartTotal = 0;
  storeId = '';
  isOrdered: boolean = false;
  isLoggedIn: boolean = false;
  constructor(public _cartService: CartService,
    private _router: Router,
    public _commonService: CommonService) {
  }

  ngOnInit() {
    this.isLoggedIn = this._commonService.isLogin();
    if (this.isLoggedIn) {
      this._cartService.getCartItems().subscribe((res: any) => {
        this.cartTotal = res && res.billTotal || 0;
        this.items = res && res.orderProducts || [];
        this.storeId = res && res.store && res.store.id;
      });
    }
    this._cartService.cartEntity$.subscribe((res) => {
      console.log('abc ', res);
      this.cartTotal = res && res.billTotal || 0;
      this.items = res && res.orderProducts || [];
    });
  }

  addItems(item) {
    this._cartService.addItems(item);
  }

  removeItems(item) {
    this._cartService.removeItems(item);
  }

  emptyCart() {
    if (this.isLoggedIn) {
      this._cartService.clearCart().subscribe(() => {
        this._cartService.resetCart();
      }, () => {
      });
    } else {
      this._cartService.resetCart();
    }
  }

  placeOrder() {
    if (this.isLoggedIn) {
      this._cartService.placeOrder().subscribe(() => {
        this._cartService.resetCart();
        this.isOrdered = true;
      });
    } else {
      this._router.navigate(['/login']);
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit, OnDestroy {

  items = [];
  cartTotal = 0;
  storeId = '';
  pathToGo: string = '/user/home';
  isOrdered: boolean = false;
  isLoggedIn: boolean = false;
  constructor(public _cartService: CartService,
    public _commonService: CommonService,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isOrdered = false;
    this._commonService.orderPlaced$.subscribe((ordered) => {
      console.log('ordeeee ', ordered);
      this.isOrdered = ordered;
      this.loadCartFromSaved();
      // once order placed, on dismiss of cart go to thome
      if (ordered) {
        this.pathToGo = '/user/home';
      }
    });
    const fromStore = this._activatedRoute.snapshot.paramMap.get('fromStore');
    console.log('isss ordered ', this.isOrdered);
    if (fromStore) {
      this.pathToGo = '/store/' + fromStore;
    }
    const fromPastOrder = this._activatedRoute.snapshot.paramMap.get('fromPastOrder');
    this.isLoggedIn = this._commonService.isLogin();
    if (this.isLoggedIn && !fromPastOrder) {
      this.loadCart();
    } else {
      this.loadCartFromSaved();
    }
  }

  /**
   * Load cart from API
   */
  loadCart() {
    this._cartService.getCartItems().subscribe((res: any) => {
      this.initialize(res);
    });
  }

  /**
   * Load cart from local storage
   */
  loadCartFromSaved() {
    this._cartService.cartEntity$.subscribe((res) => {
      this.initialize(res);
    });
  }

  initialize(res) {
    this.cartTotal = res && res.billTotal || 0;
    this.items = res && res.orderProducts || [];
    this.storeId = res && res.store && res.store.id;
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

  ngOnDestroy() {
    console.log('in destroy');
    this.isOrdered = false;
  }

}

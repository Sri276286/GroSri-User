import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { CartReplaceDialogComponent } from '../components/floating-modal/cart-replace-dialog/replace-dialog.component';
import { CommonService } from './common.service';
import * as _ from 'lodash';
import { ApiConfig } from '../config/api.config';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartEntity$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public cartEntityMap = new Map();
  public cartEntity = {
    storeId: null,
    total: 0,
    orderProducts: []
  };
  private cartQuantity = 0;
  private storeCartDetails;

  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _alertCtrl: AlertController) {
  }

  /**
   * API to load cart details
   */
  getCartItems() {
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      return this._http.get(`${ApiConfig.commonCartAndOrderURL}/IN_CART`)
        .pipe(map((res: any) => {
          console.log('get cart items ', res);
          const cart = res && res.orders && res.orders.length && res.orders[0];
          this.storeCartDetails = cart;
          if (cart && cart.billTotal && cart.orderProducts) {
            this.cartEntity.total = cart.billTotal;
            let cloneCart = _.cloneDeep(cart);
            this.cartEntityMap.set(cart.store.id, cloneCart);
            this.manageCart(cart.orderProducts.length, cloneCart);
          } else {
            // show error
          }
          return cart;
        }, () => {
          // show error
          return throwError(`Failed to get details`);
        }));
    } else {
      let cart = this.getCart();
      if (cart) {
        return of(cart).pipe(tap(() => {
          this.cartEntityMap.set(cart.storeId, cart);
          this.manageCart(cart.orderProducts.length, cart);
        }))
      } else {
        return throwError('Cannot fetch details');
      }
    }
  }

  /**
   * Get cart items total count
   */
  getCartCount() {
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      return this._http.get(ApiConfig.cartTotalURL);
    } else {
      let cart = this.getCart();
      if (cart) {
        return of(cart && cart.orderProducts && cart.orderProducts.length);
      } else {
        return throwError('Cannot get count');
      }
    }
  }

  /**
   * Push to BE when item is added or removed
   * @param item
   */
  postToCart(item) {
    const entity = {
      storeInventoryProductUnitId: item.storeInventoryProductUnitId,
      quantity: item.quantity
    };
    this._http.put(ApiConfig.cartUpdateURL, entity).subscribe(() => {
      this.updateCart(item);
    });
  }

  /**
   * Post bulk items in cart before login
   * @param items
   */
  postBulkItems(items) {
    return this._http.put(ApiConfig.cartUpdateBulkURL, items);
  }

  /**
   * API call to clear items in cart
   */
  clearCart() {
    const id = this.storeCartDetails && this.storeCartDetails.id;
    return this._http.delete(`${ApiConfig.orderURL}/${id}/delete`);
  }

  resetCart() {
    this.cartEntity$.next(null);
    this.cartQuantity$.next(0);
    this.cartEntityMap = new Map();
    this.cartEntity = {
      storeId: null,
      total: 0,
      orderProducts: []
    };
    this.cartQuantity = 0;
    localStorage.removeItem('cartEntity');
  }

  addItems(item) {
    item.quantity++;
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      this.postToCart(item);
    } else {
      this.updateCart(item);
    }
  }

  removeItems(item) {
    item.quantity--;
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      this.postToCart(item);
    } else {
      this.updateCart(item);
    }
  }

  private updateCart(item) {
    // check if already items presnt in cart (same or different store)
    let cartEntityFromMap = this.checkCartByStoreId(item.storeId);
    const cloneCartMap = _.cloneDeep(cartEntityFromMap);
    console.log('clone ', cloneCartMap);
    if (cloneCartMap) {
      this.cartEntity.storeId = cloneCartMap.storeId;
      this.cartEntity.orderProducts = cloneCartMap.orderProducts;
      this.cartEntity.total = cloneCartMap.total || cloneCartMap.billTotal;
      this.handleCartEntity(item);
    } else {
      // check if any store are in cart
      let cartMapLength = this.cartEntityMap.size;
      if (cartMapLength) {
        // show an alert to proceed
        this.presentReplaceAlert(item);
      } else {
        // directly add items
        this.handleCartEntity(item);
      }
    }
  }

  private checkCartByStoreId(id: string) {
    return this.cartEntityMap.get(id);
  }

  private handleCartEntity(item) {
    let isItemInCart = this.cartEntity && this.cartEntity.orderProducts.find(t => t.storeInventoryProductUnitId === item.storeInventoryProductUnitId);
    let itemIndex = isItemInCart && this.cartEntity && this.cartEntity.orderProducts.indexOf(isItemInCart);
    console.log('is item ', isItemInCart);
    console.log('cart eee ', this.cartEntity);
    if (!isItemInCart) {
      this.cartEntity.orderProducts = [...this.cartEntity.orderProducts, item];
      this.cartEntity.total += item.price;
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        console.log('here item ', this.cartEntity.total, item.price);
        this.cartEntity.orderProducts[itemIndex] = item;
        this.cartEntity.total += item.price;
        console.log('here ', this.cartEntity.total);
      } else {
        this.cartEntity.orderProducts.splice(itemIndex, 1);
        this.cartEntity.total -= item.price;
        this.cartQuantity--;
      }
    }
    console.log('cart ', this.cartEntity);
    // Add store id
    this.cartEntity.storeId = item.storeId;
    let cloneCartEntity = _.cloneDeep(this.cartEntity);
    // Map cart with id
    this.cartEntityMap.set(item.storeId, cloneCartEntity);
    // save in local storage
    const isLoggedIn = this._commonService.isLogin();
    if (!isLoggedIn) {
      this.setInLocalStorage();
    }
    this.manageCart(this.cartQuantity, cloneCartEntity);
  }

  placeOrder(obj) {
    return this._http.put(ApiConfig.placeOrderURL, obj);
  }

  setInLocalStorage() {
    localStorage.setItem(`cartEntity`, JSON.stringify(this.cartEntity));
  }

  private getCart() {
    let cartEntity = localStorage.getItem('cartEntity');
    let cart = cartEntity ? JSON.parse(cartEntity) : null;
    return cart;
  }

  private manageCart(cartQuantity: number, cartEntity: any) {
    console.log('cart entity ', cartEntity);
    this.cartEntity$.next(cartEntity);
    this.cartQuantity$.next(cartQuantity);
  }

  async presentReplaceAlert(item) {
    const alert = await this._alertCtrl.create({
      header: `Replace Items`,
      message: `Your cart is already having some items. Do you want to replace those items?`,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.handleCartEntity(item);
          }
        }
      ]
    });

    await alert.present();
  }

}

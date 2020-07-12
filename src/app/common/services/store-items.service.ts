import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CommonService } from './common.service';
import { CartService } from './cart.service';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StoreItemsService {

  private productsList = [];
  // private storeProductsURL: string = 'assets/mocks/menu.json';
  private storeProductsURL: string = 'assets/mocks/menu.json';
  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _cartService: CartService) {
  }

  getItems(id) {
    return new Observable((observer) => {
      this._http.get(`${ApiConfig.storeProductsURL}/${id}`)
        // this._http.get(this.storeProductsURL)
        .subscribe((res: any) => {
          if (res && res.productsByCategory) {
            // map products with cart for quantity
            this.mapWithCart(res).subscribe((result: any) => {
              this.mapProducts(result && result.productsByCategory).subscribe((products) => {
                result.productsByCategory = products;
                observer.next(result);
              });
            });
          } else {
            observer.next(res);
          }
        });
    });
  }

  //   private formStoreMenu(result) {
  // for () {

  // }
  //   }

  /**
   * Transform menu with category name, number of items and all items present
   * @param itemsRes
   */
  private mapProducts(itemsRes: any) {
    return new Observable((observer) => {
      this.productsList = [];
      // new array of items
      let itemsList = [];
      for (let category in itemsRes) {
        // object formed
        let item = {
          category: '',
          items: null,
          numberOfItems: 0
        };
        item.category = category;
        // for handling sub categories
        let itemsObj = {};
        let itemsNumber = 0;
        for (let subcategory in itemsRes[category]) {
          // push items under category if no sub category present ie., Main is dummy sub category
          if (subcategory === 'Main') {
            itemsRes[category] = itemsRes[category][subcategory];
            this.productsList = [...this.productsList, ...itemsRes[category]];
            itemsObj = itemsRes[category];
            itemsNumber = itemsRes[category].length;
          } else {
            this.productsList = [...this.productsList, ...itemsRes[category][subcategory]];
            itemsObj[subcategory] = itemsRes[category][subcategory];
            itemsNumber += itemsRes[category][subcategory].length;
          }
        }
        item.items = itemsObj;
        item.numberOfItems = itemsNumber;
        itemsList = [...itemsList, item];
      }
      // Set newly formed list
      observer.next(itemsList);
    });
  }

  public searchStore(searchInput: string): Observable<any> {
    const searchResults = this.productsList.filter((t) => {
      const pattern = new RegExp(searchInput, 'gi');
      return pattern.test(t.productName) || pattern.test(t.brandName) || pattern.test(t.itemShortDescription);
    });
    return of(searchResults);
  }

  private mapWithCart(result) {
    const isLoggedIn = this._commonService.isLogin();
    return new Observable((observer) => {
      if (isLoggedIn) {
        // cart = this._cartService.cartEntity;
        this._cartService.getCartItems().subscribe((res) => {
          const cartStore = res && res.store && res.store.id;
          const cartProducts = res && res.orderProducts;
          if (cartStore && cartProducts && cartProducts.length) {
            this._handleStoreEntity(cartStore, cartProducts, result);
          }
          observer.next(result);
        }, () => {
          // if cart API fails, continue loading store content
          observer.next(result);
        });
      } else {
        const cart = JSON.parse(localStorage.getItem('cartEntity'));
        const cartStore = cart && cart.storeId;
        const cartProducts = cart && cart.orderProducts;
        if (cartStore && cartProducts && cartProducts.length) {
          this._handleStoreEntity(cartStore, cartProducts, result);
        }
        observer.next(result);
      }
    });
  }

  private _handleStoreEntity(cartStoreId, cartProducts, result) {
    const products = result && result.productsByCategory;
    const store = result && result.store;
    if (cartStoreId
      && store
      && cartStoreId === store.id) {
      cartProducts.forEach((item) => {
        for (let category in products) {
          for (let sub in products[category]) {
            products[category][sub].map((t) => {
              if (t.storeInventoryProductUnitId === item.storeInventoryProductUnitId) {
                t.quantity = item.quantity;
                t.weight = item.weight;
                t.unit = item.unit;
                t.mrp = item.mrp;
                t.price = item.price;
              }
              if (t.storeInventoryProductUnit && t.storeInventoryProductUnit.length) {
                t.storeInventoryProductUnit.forEach((k) => {
                  if (k.id === item.storeInventoryProductUnitId) {
                    k.quantity = item.quantity;
                  }
                });
              }
              return t;
            });
          }
        }
      });
    }
  }

}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map, tap } from 'rxjs/operators';
import { CommonService } from './common.service';
import { CartService } from './cart.service';
import { ApiConfig } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser$: Observable<User>;

  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public isLogin() {
    const auth_token = localStorage.getItem('auth_token');
    return auth_token ? true : false;
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  /**
   * Save/Update user details
   */
  saveUserDetails(user) {
    return this._http.post(ApiConfig.userUpdateURL, user)
      .pipe(tap(() => {
        this._mapUser(user);
      }));
  }

  /**
   * Do Login and get user details
   * Also post if any items added in cart
   * @param user
   */
  login(user: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(ApiConfig.loginURL, user, options).pipe(map((res: any) => {
      if (res && res.accessToken) {
        localStorage.setItem('auth_token', res.accessToken);
        // post cart once login
        this._cartService.getFromLocalStorage();
        // get user details once login is successful
        this.getUser().subscribe();
        // post items to cart if in local storage and loggedin
        this.postToCart();
        return res;
      } else {
        return throwError(`No access token received`);
      }
    }));
  }

  /**
   * signup a new user
   * @param user
   */
  public register(user: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(ApiConfig.signupURL, user, options);
  }

  /**
   * Get user details
   */
  public getUser() {
    return this._http.get(ApiConfig.userDetailsURL)
      .pipe(map((res: any) => {
        const user = res && res.data;
        // login successful if there's a jwt token in the response
        if (user) {
          this._mapUser(user);
        }
        return user;
      }));
  }

  private _mapUser(user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user && user.pincode) {
      this._commonService.userLocation = user.pincode;
      localStorage.setItem('userLocation', JSON.stringify(user.pincode));
    }
    this.currentUserSubject.next(user);
  }

  private postToCart() {
    const cartEntity = localStorage.getItem('cartEntity');
    if (cartEntity) {
      const cart = JSON.parse(cartEntity);
      let items = cart && cart.orderProducts ? cart.orderProducts : [];
      if (items.length) {
        // items.forEach(element => {
        //   this._cartService.postToCart(element);
        // });
        console.log('items ', items);
        items = this._mapBulkItems(items);
        this._cartService.postBulkItems(items).subscribe(() => {
          localStorage.removeItem('cartEntity');
        }, () => {
          console.log('Bulk update failed');
        });
      }
    }
  }

  private _mapBulkItems(items) {
    return items.map((t) => {
      return {
        quantity: t.quantity,
        storeInventoryProductUnitId: t.storeInventoryProductUnitId
      }
    });
  }

  /**
   * Logout url
   */
  doLogout() {
    return this._http.get(ApiConfig.logoutURL);
  }

}

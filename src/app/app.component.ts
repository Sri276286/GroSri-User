import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { NavigationEnd, Router } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { CartService } from './common/services/cart.service';
import { LoginService } from './common/services/login.service';
import { ErrorService } from './common/services/error.service';
import { CommonService } from './common/services/common.service';
import { CategoryFullPage } from './gro/home/category/category-full/category-full.page';
import { OrderListPage } from './gro/order-list/order-list.page';
import { AddressBookPage } from './gro/profile/address-book/address-book.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public cartQuantity: number = 0;
  isLoggedIn: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private _cartService: CartService,
    private _loginService: LoginService,
    private _errorService: ErrorService,
    private _commonService: CommonService
  ) {
    this._commonService.loginSuccess$.subscribe(() => {
      this.isLoggedIn = this._commonService.isLogin();
    })
    this.initializeApp();
  }

  validateToken() {
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      this._loginService.isTokenValid().subscribe(() => {
        localStorage.setItem('session_active', 'true');
      }, () => {
        localStorage.clear();
      });
    }
  }

  handleAppErrors() {
    // subscibe to all errors on page load
    this._errorService.getErrorList();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.validateToken();
      this.getCart();
      this.handleAppErrors();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getCart() {
    this._cartService.getCartItems().subscribe(() => { },
      (error) => {
        if (error.status === 500) {
          localStorage.clear();
        }
      });
  }

  loadCategories() {
    this._commonService.presentModal(CategoryFullPage);
  }

  loadOrders() {
    this._commonService.presentModal(OrderListPage);
  }

  loadAddress() {
    this._commonService.presentModal(AddressBookPage);
  }

}

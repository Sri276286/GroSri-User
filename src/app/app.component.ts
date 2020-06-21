import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from './common/services/cart.service';
import { LoginService } from './common/services/login.service';
import { ErrorService } from './common/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private _cartService: CartService,
    private _loginService: LoginService,
    private _errorService: ErrorService
  ) {
    this.initializeApp();
  }

  init() {
    // load cart when application is loaded
    this._cartService.getCartItems().subscribe();
  }

  validateToken() {
    this._loginService.isTokenValid().subscribe(() => {
      localStorage.setItem('session_active', 'true');
    }, (error) => {
      console.log('error ', error);
      if (error)
        localStorage.clear();
    });
  }

  handleAppErrors() {
    // subscibe to all errors on page load
    this._errorService.getErrorList();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.validateToken();
      this.routehandler();
      this.handleAppErrors();
      this.init();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private routehandler() {
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const isvalid = this.validateURL(event);
        console.log('validate ', isvalid);
        if (isvalid) {
          this.showTabs();
        } else {
          this.hideTabs();
        }
      });
  }

  private hideTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'none') tabBar.style.display = 'none';
  }
  private showTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
  }

  private validateURL(event: NavigationEnd) {
    console.log('url ', event.url);
    if (event.url) {
      const homeCheck = event.urlAfterRedirects.indexOf('/home') !== -1;
      const profileCheck = event.url.indexOf('/profile') !== -1;
      console.log('home check ', homeCheck);
      return homeCheck || profileCheck;
    } else {
      return false;
    }
  }
}

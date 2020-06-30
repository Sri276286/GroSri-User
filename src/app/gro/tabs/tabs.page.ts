import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    templateUrl: 'tabs.page.html'
})
export class TabsPage implements OnInit {
    public cartQuantity: number = 0;

    constructor(private _cartService: CartService,
        private _router: Router,
        private _commonService: CommonService) {
        this.routeHandler();
    }

    ngOnInit() {
        this.getCart();
        this._commonService.orderPlaced$.subscribe(() => {
            this.getCart();
        });
    }

    getCart() {
        // load cart when application is loaded
        this._cartService.getCartCount().subscribe((res) => {
            console.log('ressss ', res);
            this.cartQuantity = res;
            console.log('cartaa ', this.cartQuantity);
        }, (error) => {
            console.log('error ', error);
            if (error.status === 500) {
                localStorage.clear();
            }
        });
    }

    private routeHandler() {
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
        if (tabBar && tabBar.style.display !== 'none') tabBar.style.display = 'none';
    }
    private showTabs() {
        const tabBar = document.getElementById('myTabBar');
        if (tabBar && tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
    }

    private validateURL(event: NavigationEnd) {
        console.log('url ', event.url);
        if (event.url) {
            const cartCheck = event.url.indexOf('/cart') === -1;
            console.log('home check ', cartCheck);
            return cartCheck;
        } else {
            return false;
        }
    }
}
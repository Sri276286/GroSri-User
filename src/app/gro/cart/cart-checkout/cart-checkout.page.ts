import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';
import { DeliveryPage } from '../delivery/delivery.page';

@Component({
    selector: 'gro-cart-checkout',
    templateUrl: 'cart-checkout.page.html',
    styleUrls: ['cart-checkout.page.scss']
})
export class CartCheckoutPage implements OnInit {

    cartTotal = 0;
    cartQuantity = '';
    quantity = 0;
    isLoggedIn: boolean = false;
    constructor(private _cartService: CartService,
        private _commonService: CommonService) { }

    ngOnInit() {
        console.log('here');
        this.isLoggedIn = this._commonService.isLogin();
        this._cartService.cartEntity$.subscribe((cart) => {
            console.log('cart ', cart);
            this.cartTotal = cart && (cart.billTotal || cart.total);
            this.quantity = cart && cart.orderProducts && cart.orderProducts.length;
            if (this.quantity === 1) {
                this.cartQuantity = `1 item`;
            } else {
                this.cartQuantity = `${this.quantity} items`;
            }
        });
    }

    loadDeliveryPage() {
        this._commonService.presentModal(DeliveryPage, { cartTotal: this.cartTotal });
    }
}

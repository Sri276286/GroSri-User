import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';

@Component({
    selector: 'gro-cart-checkout',
    templateUrl: 'cart-checkout.page.html',
    styleUrls: ['cart-checkout.page.scss']
})
export class CartCheckoutPage implements OnInit {

    cartTotal = 0;
    cartQuantity = '';
    quantity = 0;
    constructor(private _cartService: CartService) { }

    ngOnInit() {
        console.log('cart checkout loading...');
        this._cartService.cartEntity$.subscribe((cart) => {
            console.log('cart checkout ', cart);
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

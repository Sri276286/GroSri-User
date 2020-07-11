import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressBookPage } from '../../profile/address-book/address-book.page';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/common/services/cart.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'delivery.page.html',
    styleUrls: ['delivery.page.scss']
})
export class DeliveryPage implements OnInit {

    @Input() cartTotal;
    userAddress;
    deliveryOption = 'self_pickup';
    constructor(private _userService: UserService,
        private _commonService: CommonService,
        private _cartService: CartService,
        public modalCtrl: ModalController,
        private _router: Router) {

    }

    ngOnInit() {
        this._userService.getPrimaryAddress()
            .subscribe((address) => {
                this.userAddress = address;
            });
    }

    loadAddress() {
        this._commonService.presentModal(AddressBookPage);
    }

    placeOrder(form: NgForm) {
        const obj = {
            "orderAddress": this.userAddress,
            "orderStatus": "PLACED",
            "deliveryOption": form.value.deliveryOption
        };
        this._cartService.placeOrder(obj).subscribe(() => {
            this._cartService.resetCart();
            this.modalCtrl.dismiss();
            this._commonService.orderPlaced$.next(true);
        }, (error) => {
            this._commonService.presentToast('Failed to place order. Please try again!');
            if (error.status === 500)
                this._router.navigate(['/login']);
        });
    }
}
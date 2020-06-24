import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressBookPage } from '../../profile/address-book/address-book.page';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/common/services/cart.service';
import { ModalController } from '@ionic/angular';

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
        public modalCtrl: ModalController) {

    }

    ngOnInit() {
        this._userService.getPrimaryAddress()
            .subscribe((address) => {
                console.log('address ', address);
                this.userAddress = address;
            });
    }

    loadAddress() {
        this._commonService.presentModal(AddressBookPage);
    }

    placeOrder(form: NgForm) {
        console.log('form ', form);
        const obj = {
            "orderAddress": this.userAddress,
            "orderStatus": "PLACED",
            "deliveryOption": form.value.deliveryOption
        };
        this._cartService.placeOrder(obj).subscribe(() => {
            this._cartService.resetCart();
            this.modalCtrl.dismiss();
            this._commonService.orderPlaced$.next(true);
        }, () => {
            this._commonService.presentToast('Failed to place order. Please try again!');
        });
    }
}
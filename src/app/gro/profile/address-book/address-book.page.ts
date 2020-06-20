import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { ModalController } from '@ionic/angular';
import { AddressPage } from './address/address.page';

@Component({
    templateUrl: 'address-book.page.html',
    styleUrls: ['address-book.page.scss']
})
export class AddressBookPage implements OnInit {
    is_default_address = 'default';
    userAddressData = [];

    constructor(private _userService: UserService,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this._userService.getAddressList()
            .subscribe((res: any) => {
                this.userAddressData = res;
                localStorage.setItem('add_list', JSON.stringify(this.userAddressData));
            });
    }

    addAddress() {
        this.presentAddressModal();
    }

    async presentAddressModal() {
        const modal = await this.modalCtrl.create({
            component: AddressPage,
            componentProps: {
                isNew: true
            }
        });
        return await modal.present();
    }
}

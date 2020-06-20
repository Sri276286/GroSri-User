import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { ModalController } from '@ionic/angular';
import { AddressPage } from './address/address.page';
import { LocationModalPage } from '../../home/location/location.page';

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
        this.presentModal(AddressPage, { isNew: true });
    }

    loadLocation() {
        this.presentModal(LocationModalPage);
    }

    async presentModal(component, properties?: any) {
        const modal = await this.modalCtrl.create({
            component: component,
            componentProps: properties
        });
        return await modal.present();
    }
}

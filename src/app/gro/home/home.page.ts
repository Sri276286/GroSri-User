import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { LocationModalPage } from './location/location.page';
import { AddressBookPage } from '../profile/address-book/address-book.page';
import { CategoryFullPage } from './category/category-full/category-full.page';
import { MenuPage } from './menu/menu.page';
import { OrderListPage } from '../order-list/order-list.page';

@Component({
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss']
})
export class GroHomePage {

    constructor(private menuCtrl: MenuController,
        public modalCtrl: ModalController) { }

    openMenu() {
        this.openMenuItems();
    }

    loadLocation() {
        this.presentModal(AddressBookPage);
    }

    loadCategories() {
        this.presentModal(CategoryFullPage);
    }

    loadOrders() {
        this.presentModal(OrderListPage);
    }

    loadAddress() {
        this.presentModal(AddressBookPage);
    }

    async openMenuItems() {
        await this.menuCtrl.enable(true, 'mainMenu');
        await this.menuCtrl.open('mainMenu');
    }

    async presentModal(component) {
        const modal = await this.modalCtrl.create({
            component: component
        });
        return await modal.present();
    }
}
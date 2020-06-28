import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddressBookPage } from '../profile/address-book/address-book.page';
import { CategoryFullPage } from './category/category-full/category-full.page';
import { OrderListPage } from '../order-list/order-list.page';
import { CommonService } from 'src/app/common/services/common.service';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss']
})
export class GroHomePage implements OnInit {

    location: string = '';
    storeListError: boolean = false;
    isLoggedIn: boolean = false;
    constructor(private menuCtrl: MenuController,
        public modalCtrl: ModalController,
        private _commonService: CommonService,
        private _homeService: HomeService) {
        this.isLoggedIn = this._commonService.isLogin();
        this._commonService.getUserLocation()
            .subscribe((location) => {
                this.location = location;
            });
    }

    ngOnInit() {
        this._homeService.errorsSubject$.subscribe((errorEntity) => {
            if (errorEntity.isStoreList)
                this.storeListError = true;
        });
    }

    openMenu() {
        this.openMenuItems();
    }

    loadLocation() {
        this.presentModal(AddressBookPage);
    }

    // loadCategories() {
    //     this.presentModal(CategoryFullPage);
    // }

    // loadOrders() {
    //     this.presentModal(OrderListPage);
    // }

    // loadAddress() {
    //     this.presentModal(AddressBookPage);
    // }

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
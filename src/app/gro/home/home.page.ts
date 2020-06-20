import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { LocationModalPage } from './location/location.page';

@Component({
    templateUrl: 'home.page.html'
})
export class GroHomePage {

    constructor(private menuCtrl: MenuController,
        private modalCtrl: ModalController) { }

    openMenu() {
        this.openMenuItems();
    }

    loadLocation() {
        this.presentLocationModal();
    }

    async openMenuItems() {
        await this.menuCtrl.enable(true, 'mainMenu');
        await this.menuCtrl.open('mainMenu');
    }

    async presentLocationModal() {
        const modal = await this.modalCtrl.create({
            component: LocationModalPage
        });
        return await modal.present();
    }
}
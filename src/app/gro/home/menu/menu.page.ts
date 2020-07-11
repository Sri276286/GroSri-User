import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryFullPage } from '../category/category-full/category-full.page';

@Component({
    templateUrl: 'menu.page.html'
})
export class MenuPage {

    constructor(public modalCtrl: ModalController) { }

    loadCategories() {
        this.presentModal(CategoryFullPage, 'modal-menu');
        this.modalCtrl.dismiss();
    }

    async presentModal(component, cssClass?: any) {
        const modal = await this.modalCtrl.create({
            component: component,
            cssClass: 'modal-menu'
        });
        return await modal.present();
    }
}
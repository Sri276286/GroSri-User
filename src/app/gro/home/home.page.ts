import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    templateUrl: 'home.page.html'
})
export class GroHomePage {

    constructor(private menuCtrl: MenuController) { }

    openMenu() {
        this.openMenuItems();
    }

    async openMenuItems() {
        console.log('sss');
        await this.menuCtrl.enable(true, 'mainMenu');
        await this.menuCtrl.open('mainMenu');
    }
}
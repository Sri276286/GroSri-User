import { Component, Input } from '@angular/core';
import { MenuPopoverPage } from './menu-popover/menu-popover.page';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'gro-menu-button',
    templateUrl: 'menu-button.page.html',
    styleUrls: ['menu-button.page.scss']
})
export class MenuButtonPage {
    toggleMenu = false;
    @Input() categories;

    constructor(private popoverCtrl: PopoverController) { }

    openMenu() {
        this.presentPopover();
    }

    async presentPopover() {
        const popover = await this.popoverCtrl.create({
            component: MenuPopoverPage,
            componentProps: {
                categories: this.categories
            },
            translucent: true
        });
        return await popover.present();
    }
}
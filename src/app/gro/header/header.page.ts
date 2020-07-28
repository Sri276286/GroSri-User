import { Component, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'gro-header',
    templateUrl: 'header.page.html',
    styleUrls: ['header.page.scss']
})
export class HeaderPage {
    @Input() title;
    @Input() icon?: string = 'chevron-back-sharp';
    @Input() path?: string;
    @Input() hasCloseButton?: boolean = false;
    @Output() onClosePage = new EventEmitter();

    constructor(private _modalCtrl: ModalController,
        private _router: Router) { }

    /**
     * Either navigate to a route or close modal
     */
    navigateTo() {
        if (this.path) {
            this._router.navigate([this.path]);
        } else {
            this._modalCtrl.dismiss();
        }
    }

    onCloseClick() {
        this.onClosePage.emit();
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'gro-header',
    templateUrl: 'header.page.html',
    styleUrls: ['header.page.scss']
})
export class HeaderPage implements OnInit {
    @Input() title;
    @Input() icon?: string = 'chevron-back-sharp';
    @Input() path?: string;

    constructor(private _modalCtrl: ModalController,
        private _router: Router) { }

    ngOnInit() {
        console.log('icons ', this.icon);
        console.log('path ', this.path);
    }

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
}

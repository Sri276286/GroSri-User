import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'track-order.page.html',
    styleUrls: ['./track-order.page.scss']
})
export class TrackOrderPage implements OnInit {
    @Input() order;
    color1 = '';
    color2 = '';
    color3 = '';
    color4 = '';

    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        console.log('otrdeee ', this.order);
        switch (this.order && this.order.orderStatus) {
            case 'PLACED':
                this.color1 = 'success';
                this.color2 = 'medium';
                this.color3 = 'medium';
                this.color4 = 'medium';
                break;
            case 'ACCEPTED':
                this.color1 = 'warning';
                this.color2 = 'success';
                this.color3 = 'medium';
                this.color4 = 'medium';
                break;
            case 'PREPARE':
                this.color1 = 'warning';
                this.color2 = 'warning';
                this.color3 = 'success';
                this.color4 = 'medium';
                break;
            case 'READY':
                this.color1 = 'warning';
                this.color2 = 'warning';
                this.color3 = 'warning';
                this.color4 = 'success';
                break;
            default:

        }
    }
}
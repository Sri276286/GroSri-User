import { Component, OnInit } from '@angular/core';
import { OrderConstants } from 'src/app/common/constants/order.constants';
import { OrderService } from 'src/app/common/services/order.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';
import { TrackOrderPage } from './track-order/track-order.page';

@Component({
    templateUrl: 'order-list.page.html',
    styleUrls: ['./order-list.page.scss']
})
export class OrderListPage implements OnInit {
    currentOrders = [];
    pastOrders = [];
    currentRate = 0;
    showCurrentOrders = true;
    canReview: boolean = false;
    placedStatus = OrderConstants.PLACED;
    acceptedStatus = OrderConstants.ACCEPTED;
    prepareStatus = OrderConstants.PREPARE;
    readyStatus = OrderConstants.READY;
    deliveredStatus = OrderConstants.DELIVERED;
    cancelledStatus = OrderConstants.CUSTOMER_CANCELLED;
    storeCancelledStatus = OrderConstants.STORE_CANCELLED;
    isStoreRated: boolean = false;
    constructor(private _service: OrderService,
        private _router: Router,
        private _alertCtrl: AlertController,
        private _commonService: CommonService) {
    }

    ngOnInit() {
        this.getCurrentOrders();
        this.getPastOrders();
    }

    /**
     * Get current orders
     */
    getCurrentOrders() {
        this._service.getCurrentOrders().subscribe((res: any) => {
            console.log('rrr ', res);
            this.currentOrders = res;
        }, () => { });
    }

    /**
     * Get past orders
     */
    getPastOrders() {
        this._service.getPastOrders().subscribe((res: any) => {
            console.log('rrr past ', res);
            this.pastOrders = res;
        }, () => { });
    }

    orderSegmentChange(value) {
        console.log('value ', value);
        if (value.detail.value === 'past_orders') {
            this.showCurrentOrders = false;
        } else {
            this.showCurrentOrders = true;
        }
    }

    trackOrder() {
        // this._modalService.open(trackTemplate, { centered: true });
    }

    /**
     * Cancel Order
     */
    cancelOrderAlert(order) {
        this.presentAlert(order);
    }

    cancel(id: string) {
        this._service.cancelOrder(id).subscribe(() => {
            this.getCurrentOrders();
        }, () => {
        });
    }

    rateStore() {
        // this._modalService.open(ratingTemplate, { centered: true });
    }

    rateDelivery() {
        // this._modalService.open(ratingTemplate, { centered: true });
    }

    onRateChange(rate) {
        this.canReview = true;
    }

    goBack() {
        this._router.navigate(['/user/home']);
    }

    /**
     * Display a modal to track order
     */
    trackOrderModal(order) {
        this._commonService.presentModal(TrackOrderPage, { order });
    }

    async presentAlert(order) {
        const alert = await this._alertCtrl.create({
            header: `Cancel #${order.id}`,
            message: `Do you want to cancel this order?`,
            buttons: [
                {
                    text: 'No',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.cancel(order.id);
                    }
                }
            ]
        });

        await alert.present();
    }
}
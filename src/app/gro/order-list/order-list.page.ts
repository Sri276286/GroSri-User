import { Component, OnInit } from '@angular/core';
import { OrderConstants } from 'src/app/common/constants/order.constants';
import { OrderService } from 'src/app/common/services/order.service';
import { Router } from '@angular/router';

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
    deliveredStatus = OrderConstants.DELIVERED;
    cancelledStatus = OrderConstants.CUSTOMER_CANCELLED;
    storeCancelledStatus = OrderConstants.STORE_CANCELLED;
    isStoreRated: boolean = false;
    constructor(private _service: OrderService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getOrders();
    }

    /**
     * Get All orders except in cart
     */
    getOrders() {
        this._service.getOrders().subscribe((res: any) => {
            if (res && res.orders) {
                this.currentOrders = res.orders.filter((order) => {
                    return order.orderStatus === OrderConstants.PLACED;
                });
                this.pastOrders = res.orders.filter((order) => {
                    const status = (order.orderStatus === OrderConstants.DELIVERED)
                        || (order.orderStatus === OrderConstants.CUSTOMER_CANCELLED)
                        || (order.orderStatus === OrderConstants.STORE_CANCELLED);
                    console.log('status ', status);
                    return status;
                });
                console.log('placed orders ', this.currentOrders);
                console.log('past orders ', this.pastOrders);
            }
        });
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

    cancelOrder() {
        // this._modalService.open(cancelTemplate, { centered: true });
    }

    cancel(id: string) {
        this._service.cancelOrder(id).subscribe(() => {
            this.getOrders();
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
        this._router.navigate(['/home']);
    }
}
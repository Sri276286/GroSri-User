import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
    selector: 'gro-recent-order',
    templateUrl: 'recent-order.page.html'
})
export class RecentOrderPage implements OnInit {
    order;
    constructor(private _orderService: OrderService) {

    }
    ngOnInit() {
        this._orderService.getCurrentOrder().subscribe((recentOrder) => {
            this.order = recentOrder;
        });
    }
}
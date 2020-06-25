import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/services/order.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    selector: 'gro-recent-order',
    templateUrl: 'recent-order.page.html'
})
export class RecentOrderPage implements OnInit {
    recentOrder;
    constructor(private _orderService: OrderService,
        private _commonService: CommonService) {

    }
    ngOnInit() {
        const isLoggedIn = this._commonService.isLogin();
        if (isLoggedIn) {
            this._orderService.getCurrentOrder().subscribe((recentOrder) => {
                this.recentOrder = recentOrder;
            });
        }
    }
}
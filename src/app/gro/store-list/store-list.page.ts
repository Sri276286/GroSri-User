import { Input, OnInit, Component } from '@angular/core';
import { StoreService } from 'src/app/common/services/store.service';

@Component({
    selector: 'gro-store-list',
    templateUrl: 'store-list.page.html',
    styleUrls: ['./store-list.page.scss']
})
export class StoreListPage implements OnInit {
    @Input('heading') heading;
    stores = [];
    constructor(private _storeService: StoreService) {
    }

    ngOnInit() {
        this._storeService.getStores('600116').subscribe((result) => {
            this.stores = result && result.storeLst ? result.storeLst : [];
        });
    }
}
import { Input, OnInit, Component } from '@angular/core';
import { StoreService } from 'src/app/common/services/store.service';
import { CommonService } from 'src/app/common/services/common.service';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
    selector: 'gro-store-list',
    templateUrl: 'store-list.page.html',
    styleUrls: ['./store-list.page.scss']
})
export class StoreListPage implements OnInit {
    @Input('heading') heading;
    stores = [];
    constructor(private _storeService: StoreService,
        private _commonService: CommonService,
        private _homeService: HomeService) {
    }

    ngOnInit() {
        const location = this._commonService.getUserLocation();
        this._storeService.getStores(location).subscribe((result) => {
            this.stores = result && result.storeLst ? result.storeLst : [];
        }, () => {
            console.log('aaaaa');
            this._homeService.errorsSubject$.next({
                isStoreList: true
            });
        });
    }
}
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
    @Input() stores?: any = [];
    @Input() fromCategory?: boolean = false;
    defaultImage = '/assets/images/default.jpg';
    constructor(private _storeService: StoreService,
        private _commonService: CommonService,
        private _homeService: HomeService) {
    }

    ngOnInit() {
        if (!this.stores.length && !this.fromCategory) {
            this._commonService.getUserLocation().subscribe((location) => {
                this.getStores(location);
            });
        }
    }

    getStores(location) {
        this._storeService.getStores(location).subscribe((result) => {
            this.stores = result && result.storeLst ? result.storeLst : [];
        }, () => {
            this._homeService.errorsSubject$.next({
                isStoreList: true
            });
        });
    }

    handleBrokenImages(event) {
        // Register the onerror event on the image in case of a 404
        let img = event.srcElement.shadowRoot.children[0];
        img.src = this.defaultImage;
    }
}
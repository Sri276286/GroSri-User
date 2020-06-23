import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/common/services/store.service';
import { PopoverController } from '@ionic/angular';

@Component({
    templateUrl: 'menu-popover.page.html'
})
export class MenuPopoverPage implements OnInit {
    @Input() categories;

    constructor(private _storeService: StoreService,
        private _popCtrl: PopoverController) {
    }

    ngOnInit() {
        console.log('aaaaa ', this.categories);
    }

    onCategorySelect(name) {
        this._storeService.categorySelected$.next(name);
        this._popCtrl.dismiss();
    }
}
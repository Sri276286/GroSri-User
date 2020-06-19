import { Component, Input } from '@angular/core';
import { StoreService } from 'src/app/common/services/store.service';

@Component({
    templateUrl: 'menu-popover.page.html'
})
export class MenuPopoverPage {
    @Input() categories;

    constructor(private _storeService: StoreService) {

    }

    onCategorySelect(name) {
        this._storeService.categorySelected$.next(name);
    }
}
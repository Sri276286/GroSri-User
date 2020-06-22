import { Component, OnInit, Input } from '@angular/core';
import { ErrorService } from 'src/app/common/services/error.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressBookPage } from '../profile/address-book/address-book.page';

@Component({
    selector: 'gro-error',
    templateUrl: 'error.page.html',
    styleUrls: ['./error.page.scss']
})
export class ErrorPage implements OnInit {
    @Input() type: string;
    errorEntity;
    constructor(private _errorService: ErrorService,
        private _commonService: CommonService) {
    }

    ngOnInit() {
        switch (this.type) {
            case 'storeList':
                this.errorEntity = this._errorService.getErrorByType(this.type);
                console.log('error ', this.errorEntity);
                break;
            default:
        }
        console.log('error ', this.errorEntity);
    }

    handleActions() {
        switch (this.type) {
            case 'storeList':
                this._commonService.presentModal(AddressBookPage);
                break;
            default:
        }
    }
}
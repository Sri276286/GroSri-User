import { Component, OnInit, Input } from '@angular/core';
import { ErrorService } from 'src/app/common/services/error.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressBookPage } from '../profile/address-book/address-book.page';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'gro-error',
    templateUrl: 'error.page.html',
    styleUrls: ['./error.page.scss']
})
export class ErrorPage implements OnInit {
    @Input() type: string;
    errorEntity;
    constructor(private _errorService: ErrorService,
        private _commonService: CommonService,
        private _router: Router,
        private _modalCtrl: ModalController) {
    }

    ngOnInit() {
        setTimeout(() => {
            switch (this.type) {
                case 'storeList':
                case 'emptyCart':
                case 'orderPlaced':
                case 'pageNotFound':
                    this.errorEntity = this._errorService.getErrorByType(this.type);
                    break;
                case 'currentOrder':
                case 'pastOrder':
                case 'emptyStore':
                    this.errorEntity = this._errorService.getErrorByType(this.type);
                    break;
                default:
            }
        });
    }

    handleActions() {
        switch (this.type) {
            case 'storeList':
                this._commonService.presentModal(AddressBookPage);
                break;
            case 'emptyCart':
            case 'emptyStore':
            case 'pageNotFound':
                this._router.navigate(['/user']);
                break;
            case 'currentOrder':
            case 'pastOrder':
                this._modalCtrl.dismiss();
                break;
            case 'orderPlaced':
                this._router.navigate(['/orders']);
            default:
        }
    }
}
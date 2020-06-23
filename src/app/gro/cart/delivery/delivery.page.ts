import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressBookPage } from '../../profile/address-book/address-book.page';

@Component({
    templateUrl: 'delivery.page.html',
    styleUrls: ['delivery.page.scss']
})
export class DeliveryPage implements OnInit {

    userAddress;
    constructor(private _userService: UserService,
        private _commonService: CommonService) {

    }

    ngOnInit() {
        this._userService.getPrimaryAddress()
            .subscribe((address) => {
                console.log('address ', address);
                this.userAddress = address;
            });
    }

    loadAddress() {
        this._commonService.presentModal(AddressBookPage);
    }
}
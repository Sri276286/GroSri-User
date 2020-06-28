import { Component } from '@angular/core';
import { LoginService } from 'src/app/common/services/login.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ModalController } from '@ionic/angular';
import { UserModalPage } from './user-modal/user-modal.page';
import { AddressBookPage } from './address-book/address-book.page';

@Component({
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    user;
    constructor(private _loginService: LoginService,
        private _route: Router,
        private modalCtrl: ModalController) {
        this._loginService.getCurrentUser().subscribe((user) => {
            console.log('current user ', user);
            if (!user) {
                this._loginService.getUser().subscribe((user) => {
                    this.user = user;
                })
            } else {
                this.user = user;
            }
        });
    }

    editProfile() {
        this.presentUserModal();
    }

    showAddress() {
        this.presentAddressModal();
    }

    async presentUserModal() {
        const modal = await this.modalCtrl.create({
            component: UserModalPage,
            componentProps: {
                user: this.user
            }
        });
        return await modal.present();
    }

    async presentAddressModal() {
        const modal = await this.modalCtrl.create({
            component: AddressBookPage
        });
        return await modal.present();
    }

    logout() {
        this._loginService.doLogout().subscribe(() => {
            this.logoutReset();
        }, () => {
            this.logoutReset();
        });
    }

    logoutReset() {
        localStorage.clear();
        this._route.navigate(['/login']);
    }
}
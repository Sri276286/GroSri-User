import { Component } from '@angular/core';
import { LoginService } from 'src/app/common/services/login.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    user;
    isLoggedIn: boolean = false;
    constructor(private _loginService: LoginService,
        private _route: Router,
        private _commonService: CommonService) {
        this.isLoggedIn = this._loginService.isLogin();
        console.log('issss login ', this.isLoggedIn);
        if (!this.isLoggedIn) {
            this.redirectToLogin();
        } else {
            this._loginService.getCurrentUser().subscribe((user) => {
                console.log('current user ', user);
                this.user = user;
            });
        }
    }

    redirectToLogin() {
        // show a message and redirect
        this._route.navigate(['/login']);
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
        this._commonService.userLocation = '';
        this._route.navigate(['/login']);
    }
}
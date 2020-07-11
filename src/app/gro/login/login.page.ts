import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';
import { ValidationConstants } from 'src/app/common/constants/validation.constants';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    selector: 'gro-store-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router,
        private _commonService: CommonService) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', [Validators.required,
            Validators.pattern(ValidationConstants.password)]]
        });
    }

    /**
     * Submit login form
     * @param isvalid
     */
    submit(isvalid: boolean) {
        if (isvalid) {
            this.loginService.login(this.loginForm.value).subscribe(() => {
                this._commonService.loginSuccess$.next(true);
                this._router.navigate(['/user']);
            });
        }
    }
}
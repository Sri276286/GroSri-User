import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';
import { ValidationConstants } from 'src/app/common/constants/validation.constants';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    selector: 'gro-store-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    fromCart: string = 'false';

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router,
        private _commonService: CommonService,
        private _activatedRoute: ActivatedRoute) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', [Validators.required,
            Validators.pattern(ValidationConstants.password)]]
        });
    }

    ngOnInit() {
        this.fromCart = this._activatedRoute.snapshot.paramMap.get('fromCart');
    }

    /**
     * Submit login form
     * @param isvalid
     */
    submit(isvalid: boolean) {
        if (isvalid) {
            this.loginService.login(this.loginForm.value).subscribe(() => {
                this._commonService.loginSuccess$.next(true);
                if (this.fromCart === 'true') {
                    this._router.navigate(['/user/cart']);
                } else {
                    this._router.navigate(['/user']);
                }
            });
        }
    }
}
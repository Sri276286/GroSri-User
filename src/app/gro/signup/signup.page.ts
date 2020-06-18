import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';
import { ConfirmPasswordValidator } from 'src/app/common/services/confirm.password';
import { ValidationConstants } from 'src/app/common/constants/validation.constants';

@Component({
    selector: 'gro-store-signup',
    templateUrl: 'signup.page.html',
    styleUrls: ['signup.page.scss']
})
export class SignupPage {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router) {
        this.registerForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.email]],
            pincode: [""],
            mobileNumber: ["", [Validators.required, Validators.pattern(ValidationConstants.phoneNumber)]],
            password: ["", [Validators.required, Validators.pattern(ValidationConstants.password)]],
            confirm_password: ["", [Validators.required,
                ConfirmPasswordValidator]]
        });
    }

    /**
     * Submit register form
     * @param isValid
     */
    onSubmit(isValid: boolean) {
        console.log('is valid ', isValid);
        console.log('form ', this.registerForm);
        if (isValid) {
            this.loginService.register(this.registerForm.value).subscribe(() => {
                console.log('registered');
                this._router.navigate(['/login']);
            });
        }
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
    templateUrl: 'user-modal.page.html',
    styleUrls: ['user-modal.page.scss']
})
export class UserModalPage implements OnInit {
    @Input() user;
    userProfile: FormGroup;

    constructor(public modalCtrl: ModalController,
        private _loginService: LoginService,
        private _fb: FormBuilder,
        private _router: Router) {

    }

    ngOnInit() {
        this.userProfile = this._fb.group({
            name: ['', Validators.required],
            mobileNumber: ['',
                [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            ],
            email: ['', Validators.required],
            dob: [''],
            promotions_ok: [true]
        });
        this.userProfile.patchValue(this.user);
    }

    onSubmit(valid) {
        if (valid) {
            this._loginService.saveUserDetails(this.userProfile.value).subscribe(() => {
                this._router.navigate(['/home']);
            }, () => {
                this._router.navigate(['/home']);
            });
        }
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
    templateUrl: 'address.page.html'
})
export class AddressPage implements OnInit {
    editMainDetails = true;
    user;
    userAddress: FormGroup;
    @Input() isNew;
    @Input() address;
    constructor(private fb: FormBuilder, private _route: Router,
        private _userService: UserService,
        public modalCtrl: ModalController,
        private _loginService: LoginService) {
    }

    ngOnInit() {
        this.userAddress = this.fb.group({
            addressId: [''],
            name: ['Srikanth K', Validators.required],
            phone_number: ['7299933974', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            flatNo: ['', Validators.required],
            apartment: [''],
            street: ['', Validators.required],
            landmark: [''],
            area: ['', Validators.required],
            city: ['', Validators.required],
            pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            type: ['home'],
            primary_address: [false]
        });
        if (this.address) {
            this.userAddress.patchValue(this.address);
        }

        this._loginService.getUser().subscribe((user: any) => {
            this.user = user;
        });
    }

    getAddressById(id: string) {
        const add_list = JSON.parse(localStorage.getItem('add_list'));
        return add_list.find(t => t.addressId === +id);
    }

    onSubmit(isValid) {
        const { addressId, ...addressWithoutId } = this.userAddress.value;
        if (isValid) {
            if (this.isNew) {
                this._userService.addAddress(addressWithoutId).subscribe(() => {
                    this._route.navigate(['/address']);
                });
            } else {
                this._userService.updateAddress(this.userAddress.value).subscribe(() => {
                    this._route.navigate(['/address']);
                });
            }
        }
    }
}

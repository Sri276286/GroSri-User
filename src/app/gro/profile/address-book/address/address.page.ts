import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/common/services/user.service";
import { ModalController } from "@ionic/angular";
import { LoginService } from "src/app/common/services/login.service";
import { CommonService } from "src/app/common/services/common.service";
import { UserAddress } from '../../../../common/models/user-address.model';
import { DeliveryPage } from 'src/app/gro/cart/delivery/delivery.page';
import { CartService } from 'src/app/common/services/cart.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: "address.page.html",
})
export class AddressPage implements OnInit {
  editMainDetails = true;
  user;
  userAddress: FormGroup;
  @Input() isNew;
  @Input() address;
  isFromDeliverPage: boolean = false;
  cartTotal: number;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    public modalCtrl: ModalController,
    private _loginService: LoginService,
    private _commonService: CommonService,
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this.userAddress = this.fb.group({
      addressId: [""],
      name: ["", Validators.required],
      number: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      flatNo: ["", Validators.required],
      apartment: [""],
      street: ["", Validators.required],
      landmark: [""],
      area: ["", Validators.required],
      city: ["", Validators.required],
      pincode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      type: ["HOME"],
      primaryAddress: [false],
    });
    if (this.address) {
      this.userAddress.patchValue(this.address);
    }

    this._loginService.getUser().subscribe((user: any) => {
      this.user = user;
      this.userAddress.get('name').setValue(this.user.name);
      this.userAddress.get('number').setValue(this.user.mobileNumber);
    });
  }

  getAddressById(id: string) {
    const add_list = JSON.parse(localStorage.getItem("add_list"));
    return add_list.find((t) => t.addressId === +id);
  }

  onSubmit(isValid) {
    const { addressId, ...addressWithoutId } = this.userAddress.value;
    const addressIdObject: UserAddress = addressWithoutId;
    addressIdObject.name = this.userAddress.value.name;


    //Takes 1 value from the cart and unsubscribes it 
    this._cartService.cartEntity$.pipe(take(1)).subscribe((cart) => {
      this.cartTotal = cart && (cart.billTotal || cart.total);
    })

    this._commonService.fromDeliveryPage$.pipe(take(1)).subscribe((fromDeliveryPageParam) => {
      this.isFromDeliverPage = fromDeliveryPageParam;
    })
    if (isValid) {
      if (this.isNew) {
        this._userService.addAddress(addressIdObject).subscribe(() => {
          this.modalCtrl.dismiss();

          this._commonService.addressSaved$.next(true);
          if (this.isFromDeliverPage) {
            this._commonService.presentModal(DeliveryPage, { cartTotal: this.cartTotal });
            this._commonService.addressSelected$.next(this.userAddress.value as UserAddress);
          }

        });
      } else {
        this._userService
          .updateAddress(this.userAddress.value)
          .subscribe(() => {
            this._commonService.addressSaved$.next(true);
            this._commonService.addressSelected$.next(this.userAddress.value as UserAddress);

          });
      }
    }
  }



}

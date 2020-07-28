import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/common/services/login.service";
import { ValidationConstants } from "src/app/common/constants/validation.constants";
import { ToastController } from "@ionic/angular";
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: "gro-refer-store",
  templateUrl: "refer-a-store.page.html",
  styleUrls: ["refer-a-store.page.scss"],
})
export class ReferAStore {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private _router: Router,
    private _commonService : CommonService
  ) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.email]],
      pincode: ["",[Validators.required]],
      mobileNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(ValidationConstants.phoneNumber),
        ],
      ],
      storeName: ["", [Validators.required, Validators.minLength(6)]],
      ownerName: [""],
      area: ["",[Validators.required]],
      city: ["",[Validators.required]],
      storeCategory: [""]
      //   password: [
      //     "",
      //     [Validators.required, Validators.pattern(ValidationConstants.password)],
      //   ],
      //   confirm_password: ["", [Validators.required, ConfirmPasswordValidator]],
    });
  }

  /**
   * Submit register form
   * @param isValid
   */
  onSubmit(isValid: boolean) {
    if (isValid) {
      this._router.navigate(["/"]);
      //   this.loginService.register(this.registerForm.value).subscribe(() => {
      //     this._router.navigate(["/login"]);
      //   });
    }
  }
  onClear() {
    this.registerForm.reset();
  }
  validate($event) {
    switch ($event.target.name) {
      case "email":
        if (this.registerForm.get("email").errors?.email)
          this._commonService.presentToast("Please provide a valid email address.");
        break;
      case "mobilenumber":
        if (this.registerForm.get("mobileNumber").errors?.pattern)
          this._commonService.presentToast("Phone number must be a valid 10 digit number.");
        break;
    }
  }

  onCloseStorePage(){
    this._router.navigate(["/"]);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConfig } from '../config/api.config';
import { UserAddress } from '../models/user-address.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  primaryAddressURL: string = 'assets/mocks/primary-address.json';
  constructor(private _http: HttpClient) {
  }

  /**
   * Get user address list
   */
  getAddressList() {
    return this._http.get(ApiConfig.userAddressListURL)
      .pipe(map((res: any) => {
        return this._mapAddressList(res && res.data);
      }));
  }

  /**
   * Get Primary Address
   */
  getPrimaryAddress() {
    // return this._http.get();
    return this._http.get(this.primaryAddressURL);
  }

  /**
   * Add a new address
   */
  addAddress(address) {
    return this._http.post(ApiConfig.userAddressAddURL, address);
  }

  /**
   * Update address
   * @param address
   */
  updateAddress(address) {
    return this._http.post(ApiConfig.userAddressUpdateURL, address);
  }

  /**
   * Map primary address to top list
   * @param addressList
   */
  private _mapAddressList(addressList: UserAddress[]) {
    // find primary address
    const primary = addressList.find(t => t.primaryAddress);
    if (primary) {
      const index = addressList.indexOf(primary);
      // remove from list
      addressList.splice(index, 1);
      // add to beginning
      addressList.unshift(primary);
    }
    return addressList;
  }
}

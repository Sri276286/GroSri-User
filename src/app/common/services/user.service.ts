import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
  private _mapAddressList(addressList) {
    // find primary address
    const primary = addressList.find(t => t.primaryAddress);
    if (primary) {
      const index = addressList.indexOf(primary);
      // add to beginning
      addressList.unshift(primary);
      // remove from list
      addressList.splice(index, 1);
    }
    return addressList;
  }
}

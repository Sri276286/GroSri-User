import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { ApiConfig } from '../config/api.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storeListUrl: string = 'assets/mocks/stores.json';
  categorySelected$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient,
    private _commonService: CommonService) {
  }

  /**
   * Get stores based on area or pincode
   * @param locationKey
   */
  getStores(locationKey: string) {
    return this._http.get(`${ApiConfig.storeListURL}/${locationKey}`)
      // return this._http.get(this.storeListUrl)
      .pipe(map((res: any) => {
        const stores = res && res.storeDetails;
        this._commonService.storesListed = stores;
        return res;
      }));
  }

  markFavorite(storeEntity: any) {
    return this._http.post(ApiConfig.favoriteStoreURL, storeEntity);
  }

  getFavStores() {
    return this._http.get(ApiConfig.favoriteStoreURL);
  }
}

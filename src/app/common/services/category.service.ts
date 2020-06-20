import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { ApiConfig } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categoryURL = 'assets/mocks/category-list.json';
    constructor(private _http: HttpClient,
        private _commonService: CommonService) {
    }

    getCategories() {
        return this._http.get(this.categoryURL);
    }

    getStoresByCategory(id: string) {
        console.log('id ', id);
        const location = this._commonService.getUserLocation();
        if (location) {
          let params = new HttpParams();
          params = params.append('category', id);
          return this._http.get(`${ApiConfig.storeListURL}/${location}`, { params: params });
        }
      }
}
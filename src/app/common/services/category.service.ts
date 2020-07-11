import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { ApiConfig } from '../config/api.config';
import { Observable } from 'rxjs';

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
        return new Observable((observer) => {
            this._commonService.getUserLocation().subscribe((location: string) => {
                if (location) {
                    let params = new HttpParams();
                    params = params.append('category', id);
                    this._http.get(`${ApiConfig.storeListURL}/${location}`, { params: params })
                        .subscribe((res: any) => {
                            observer.next(res && res.storeLst);
                        });
                }
            });
        });
    }
}
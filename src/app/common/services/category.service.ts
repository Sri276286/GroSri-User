import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categoryURL = 'assets/mocks/category-list.json';
    constructor(private _http: HttpClient) {
    }

    getCategories() {
        return this._http.get(this.categoryURL);
    }
}
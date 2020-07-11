import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ErrorJson from 'src/assets/mocks/errors-list.json';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errors = [];
    private errorListURL: string = 'assets/mocks/errors-list.json';
    constructor(private _http: HttpClient) {

    }

    /**
     * Get list of error pages
     */
    getErrorList() {
        this._http.get(this.errorListURL)
            .subscribe((list: any) => {
                this.errors = list;
            });
    }

    /**
     * Find if error is present for a type
     * @param type
     */
    getErrorByType(type: string) {
        if (!this.errors.length) {
            // this.errors = require('assets/mocks/errors-list.json');
            this.errors = ErrorJson;
        }
        const found = this.errors.find(t => t.type === type);
        if (found)
            return found;
    }
}
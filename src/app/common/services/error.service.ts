import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errors = [];
    private errorListURL: string = 'assets/mocks/errors-list.json';
    constructor(private _http: HttpClient) {

    }

    getErrorList() {
        this._http.get(this.errorListURL)
            .subscribe((list: any) => {
                this.errors = list;
                console.log('errors hhhh ', this.errors);
            });
    }

    getErrorByType(type: string) {
        console.log('type ', this.errors);
        const found = this.errors.find(t => t.type === type);
        console.log('found ', found, type);
        if (found)
            return found;
    }
}
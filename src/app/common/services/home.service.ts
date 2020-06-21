import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GroError } from '../models/errors';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private offerSlidesURL = 'assets/mocks/offers-slide.json';
    private locationsURL = 'assets/mocks/locations.json';
    errorsSubject$: Subject<GroError> = new Subject<GroError>();
    constructor(private _http: HttpClient) {
    }

    getOfferSlides() {
        return this._http.get(this.offerSlidesURL);
    }

    getLocations() {
        return this._http.get(this.locationsURL);
    }
}
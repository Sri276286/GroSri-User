import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GroError } from '../models/errors';
import { ApiConfig } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private offerSlidesURL = 'assets/mocks/offers-slide.json';
    private locationsURL = 'assets/mocks/locations.json';
    errorsSubject$: Subject<GroError> = new Subject<GroError>();
    locationEntered$: Subject<number> = new Subject<number>();
    constructor(private _http: HttpClient) {
    }

    getOfferSlides() {
        return this._http.get(this.offerSlidesURL);
    }

    getLocations() {
        return this._http.get(this.locationsURL);
    }

    updatePincode(pincode: string) {
        return this._http.post(ApiConfig.userUpdateURL, { pincode });
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private offerSlidesURL = 'assets/mocks/offers-slide.json';
    private locationsURL = 'assets/mocks/locations.json';
    constructor(private _http: HttpClient) {
    }

    getOfferSlides() {
        return this._http.get(this.offerSlidesURL);
    }

    getLocations() {
        return this._http.get(this.locationsURL);
    }
}
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
    selector: 'gro-offer-slide',
    templateUrl: 'offer-slide.page.html'
})
export class OfferSlidePage implements OnInit {
    offers = [];
    slideOpts = {
        initialSlide: 1,
        slidesPerView: 1,
        autoplay: {
            delay: 3000
        }
    };

    constructor(private _homeService: HomeService) { }

    ngOnInit() {
        this._homeService.getOfferSlides().subscribe((result: any) => {
            this.offers = result;
        });
    }
}
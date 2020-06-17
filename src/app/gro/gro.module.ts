import { NgModule } from '@angular/core';
import { GroHomePage } from './home/home.page';
import { CategoryPage } from './home/category/category.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StoreListPage } from './store-list/store-list.page';
import { OfferSlidePage } from './home/offer-slides/offer-slide.page';
import { ReferPage } from './refer/refer.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        GroHomePage,
        CategoryPage,
        StoreListPage,
        OfferSlidePage,
        ReferPage
    ]
})
export class GroModule {

}
import { NgModule } from '@angular/core';
import { GroHomePage } from './home/home.page';
import { CategoryPage } from './home/category/category.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarouselPage } from './home/carousel/carousel.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        GroHomePage,
        CategoryPage,
        CarouselPage
    ]
})
export class GroModule {

}
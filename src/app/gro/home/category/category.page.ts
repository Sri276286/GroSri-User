import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/services/category.service';
import { CategoryStorePage } from './category-stores/category-store.page';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'gro-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss']
})
export class CategoryPage implements OnInit {
    slideOpts = {
        slidesPerView: 5,
        freeMode: true,
        pagination: false
    };
    categories = [];
    constructor(private _categoryService: CategoryService,
        private modalCtrl: ModalController) { }

    ngOnInit() {
        this.getCategoryList();
    }

    getCategoryList() {
        this._categoryService.getCategories().subscribe((resp: any) => {
            console.log('res ', resp);
            this.categories = resp;
        });
    }

    onCategoryClick(categoryId: string) {
        this.presentModal(CategoryStorePage, { categoryId });
    }

    async presentModal(component, properties) {
        const modal = await this.modalCtrl.create({
            component: component,
            componentProps: properties
        });
        return await modal.present();
    }
}
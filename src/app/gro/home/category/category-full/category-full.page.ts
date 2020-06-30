import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/common/services/category.service';
import { CategoryStorePage } from '../category-stores/category-store.page';

@Component({
    templateUrl: 'category-full.page.html'
})
export class CategoryFullPage implements OnInit {
    categories = [];
    constructor(public modalCtrl: ModalController,
        private _categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategoryList();
    }

    getCategoryList() {
        this._categoryService.getCategories().subscribe((resp: any) => {
            console.log('res ', resp);
            this.categories = resp;
        });
    }

    onCategoryClick(category: string) {
        this.presentModal(CategoryStorePage, { category });
    }

    async presentModal(component, properties) {
        const modal = await this.modalCtrl.create({
            component: component,
            componentProps: properties
        });
        return await modal.present();
    }
}
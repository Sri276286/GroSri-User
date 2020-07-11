import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/services/category.service';
import { CategoryStorePage } from './category-stores/category-store.page';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';

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
        private _commonService: CommonService) { }

    ngOnInit() {
        this.getCategoryList();
    }

    getCategoryList() {
        this._categoryService.getCategories().subscribe((resp: any) => {
            this.categories = resp;
        });
    }

    onCategoryClick(category: any) {
        this._commonService.presentModal(CategoryStorePage, { category });
    }

}
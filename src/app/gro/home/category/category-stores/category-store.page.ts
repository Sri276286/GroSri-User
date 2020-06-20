import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/common/services/category.service';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'category-store.page.html'
})
export class CategoryStorePage implements OnInit {
    categoryStores = [];
    categoryName: string = '';
    @Input() categoryId;
    constructor(private _categoryService: CategoryService,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this._categoryService.getStoresByCategory(this.categoryId).subscribe((res: any) => {
            this.categoryName = res && res.categoryName;
            this.categoryStores = res && res.storeLst;
        });
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/common/services/category.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
    templateUrl: 'category-store.page.html'
})
export class CategoryStorePage implements OnInit {
    categoryStores = [];
    @Input() category;
    constructor(private _categoryService: CategoryService,
        public modalCtrl: ModalController,
        private _commonService: CommonService) {
    }

    ngOnInit() {
        console.log("category"+this.category);

        this._categoryService.getStoresByCategory(this.category.id).subscribe((storeList: any) => {
            console.log(storeList);
            this.categoryStores = storeList;
        });
    }

    dismiss() {
        this._commonService.dismissAllModals();
    }
}
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/services/category.service';

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
    constructor(private _categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategoryList();
    }

    getCategoryList() {
        this._categoryService.getCategories().subscribe((resp: any) => {
            console.log('res ', resp);
            this.categories = resp;
        });
    }
}
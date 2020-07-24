import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';
import { ModalController } from '@ionic/angular';
import { ReviewComponent } from '../../review/review.component';
import { ProductreviewComponent } from '../../productreview/productreview.component';
import { CommonService } from '../../../common/services/common.service';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.page.html',
    styleUrls: ['./product-list.page.scss']
})
export class ProductListPage {
    @Input('products') products;
    @Input() fromStore?: boolean = false;
    @Input() fromSearch?: boolean = false;
    @Input() fromCart?: boolean = false;

    constructor(private _cartService: CartService,
        private _modalCtrl: ModalController,
        private _commonService: CommonService) { }

    onWeightChange(val, item) {
        // map quantity for already selected weights
        item = this._mapItemOnWeightChange(item);
        let weightEntity = item.storeInventoryProductUnit.find(t => t.weight === val);
        item.weight = weightEntity.weight;
        item.price = weightEntity.price;
        item.storeInventoryProductUnitId = weightEntity.id;
        item.quantity = weightEntity.quantity;
        item.productImgUrl = weightEntity.productImgUrl;
    }

    /**
     * Add item to the cart
     */
    addItem(item) {
        if (this.fromSearch) {
            this._modalCtrl.dismiss();
        }
        this._cartService.addItems(item);
    }
/**
 * To update Review to a product
 * @param item 
 */
    addReview(item){
        console.log("Itemmmm"+item);
       // this._commonService.presentModal(ReviewComponent,item);
       this._commonService.presentModal(ProductreviewComponent,item)
    }

    /**
     * Remove item from the cart
     * @param item
     */
    removeItem(item) {
        this._cartService.removeItems(item);
    }

    private _mapItemOnWeightChange(item) {
        const units = item.storeInventoryProductUnit;
        if (item.quantity && units
            && units.length) {
            item.storeInventoryProductUnit = units.map((t) => {
                if (t.id === item.storeInventoryProductUnitId) {
                    t.quantity = item.quantity;
                }
                return t;
            });
        }
        return item;
    }
}
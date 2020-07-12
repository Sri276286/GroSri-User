import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/common/services/cart.service';
import { ModalController } from '@ionic/angular';

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
        private _modalCtrl: ModalController) { }

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
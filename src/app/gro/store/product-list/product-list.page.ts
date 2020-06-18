import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemWeightsPage } from '../item-weights/item-weights.page';
import { CartService } from 'src/app/common/services/cart.service';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.page.html',
    styleUrls: ['./product-list.page.scss']
})
export class ProductListPage {
    @Input('products') products;

    constructor(private modalCtrl: ModalController,
        private _cartService: CartService) { }

    onWeightChange(val, item) {
        // map quantity for already selected weights
        item = this._mapItemOnWeightChange(item);
        let weightEntity = item.storeInventoryProductUnit.find(t => t.weight === val);
        item.weight = weightEntity.weight;
        item.price = weightEntity.price;
        item.storeInventoryProductUnitId = weightEntity.id;
        item.quantity = weightEntity.quantity;
    }

    /**
     * Add item to the cart
     */
    addItem(item) {
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

    selectWeightsModal(item) {
        this.presentWeightsModal(item);
    }

    async presentWeightsModal(item?: any) {
        const modal = await this.modalCtrl.create({
            component: ItemWeightsPage,
            cssClass: 'modal-grosri',
            componentProps: {
                'item': item
            }
        });
        return await modal.present();
    }
}
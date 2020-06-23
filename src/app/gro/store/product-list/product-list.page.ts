import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/common/services/cart.service';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.page.html',
    styleUrls: ['./product-list.page.scss']
})
export class ProductListPage implements OnInit {
    @Input('products') products;

    weightAlertOptions: any = {
        header: 'Choose Weight',
        translucent: true,
      };

    constructor(private _cartService: CartService) { }

    ngOnInit() {
        console.log('producccc ', this.products);
    }

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
}
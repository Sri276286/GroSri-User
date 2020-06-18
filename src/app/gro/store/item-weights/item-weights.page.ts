import { Input, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'item-weights.page.html',
    styleUrls: ['./item-weights.page.scss']
})
export class ItemWeightsPage implements OnInit {
    @Input('item') item;
    weights = [];

    ngOnInit() {
        this.weights = this.item.storeInventoryProductUnit;
    }
}
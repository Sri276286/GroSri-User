import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderConstants } from 'src/app/common/constants/order.constants';
import { OrderService } from 'src/app/common/services/order.service';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AlertController } from '@ionic/angular';
import { TrackOrderPage } from '../track-order/track-order.page';

@Component({
  templateUrl: 'order-details.page.html',
  styleUrls: ['./order-details.page.scss']
})
export class OrderDetailsPage implements OnInit {

  items = [];
  orderEntity;
  orderDetails;
  storeDetails;
  placedStatus = OrderConstants.PLACED;
  acceptedStatus = OrderConstants.ACCEPTED;
  prepareStatus = OrderConstants.PREPARE;
  readyStatus = OrderConstants.READY;
  deliveredStatus = OrderConstants.DELIVERED;
  cancelledStatus = OrderConstants.CUSTOMER_CANCELLED;
  storeCancelledStatus = OrderConstants.STORE_CANCELLED;
  showSummary = true;
  constructor(public _service: OrderService,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _router: Router,
    private _commonService: CommonService,
    private _alertCtrl: AlertController) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._service.getOrderById(id).subscribe((res: any) => {
        this.orderEntity = res.orders.length && res.orders[0];
        this.storeDetails = this.orderEntity && this.orderEntity.store;
        this.items = this.orderEntity.orderProducts;
      });
    });
  }

  orderSegmentChange(value) {
    if (value.detail.value === 'order_summary') {
      this.showSummary = true;
    } else {
      this.showSummary = false;
    }
  }

  reorder() {
    let cartEntity = {
      storeId: this.orderEntity.store && this.orderEntity.store.id,
      total: this.orderEntity.billTotal,
      orderProducts: this.orderEntity.orderProducts
    };
    this._cartService.getCartItems().subscribe((res) => {
      if (res) {
        this.presentReplaceAlert(cartEntity);
      } else {
        this._handleCart(cartEntity);
      }
    });
  }

  /**
   * Handle cart for re-order
   * @param cartEntity
   */
  private _handleCart(cartEntity) {
    this._cartService.postBulkItems(cartEntity.orderProducts).subscribe();
    this._commonService.repeatOrder$.next(true);
    this._cartService.cartEntity$.next(cartEntity);
    this._cartService.cartQuantity$.next(cartEntity.orderProducts.length);
    this._cartService.cartEntityMap.set(this.orderEntity.store.id, cartEntity);
    this._router.navigate(['/user/cart', { 'fromPastOrder': true }]);
  }

  /**
   * Display a modal to track order
   */
  trackOrderModal(order) {
    this._commonService.presentModal(TrackOrderPage, { order });
  }

  /**
   * Cancel Order
   */
  cancelOrderAlert(order) {
    this.presentAlert(order);
  }

  cancel(id: string) {
    this._service.cancelOrder(id).subscribe(() => {
      this._router.navigate(['/orders']);
    }, () => {
    });
  }

  async presentAlert(order) {
    const alert = await this._alertCtrl.create({
      header: `Cancel #${order.id}`,
      message: `Do you want to cancel this order?`,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.cancel(order.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentReplaceAlert(cartEntity) {
    const alert = await this._alertCtrl.create({
      header: `Replace Items`,
      message: `Your cart is already having some items. Do you want to replace those items?`,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this._handleCart(cartEntity);
          }
        }
      ]
    });

    await alert.present();
  }

}

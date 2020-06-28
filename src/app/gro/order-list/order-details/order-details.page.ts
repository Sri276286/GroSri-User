import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderConstants } from 'src/app/common/constants/order.constants';
import { OrderService } from 'src/app/common/services/order.service';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';
import { AlertController } from '@ionic/angular';

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
        console.log('dd ', res);
        this.orderEntity = res.orders.length && res.orders[0];
        console.log('order entity ', this.orderEntity);
        this.storeDetails = this.orderEntity && this.orderEntity.store;
        this.items = this.orderEntity.orderProducts;
      });
    });
  }

  orderSegmentChange(value) {
    console.log('value ', value);
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
      orderProducts: this.orderEntity.orderProductLstDTO
    };
    let cart = localStorage.getItem('cartEntity');
    if (cart) {
      this._cartService.showAlert();
      this._commonService.proceedUpdatingCart$.subscribe((proceed) => {
        if (proceed) {
          this._handleCart(cartEntity);
        }
      });
    } else {
      this._handleCart(cartEntity);
    }
  }

  private _handleCart(cartEntity) {
    // localStorage.setItem('cartEntity', JSON.stringify(cartEntity));
    this._cartService.cartEntity$.next(cartEntity);
    this._cartService.cartQuantity$.next(cartEntity.items.length);
    this._cartService.cartEntityMap.set(this.orderEntity.store.id, cartEntity);
    this._router.navigate(['/cart']);
  }

  trackOrder(trackTemplate: TemplateRef<any>) {
    // this._modalService.open(trackTemplate, { centered: true });
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
            console.log('Confirm Cancel: blah');
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

}

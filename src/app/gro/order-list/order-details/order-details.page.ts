import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderConstants } from 'src/app/common/constants/order.constants';
import { OrderService } from 'src/app/common/services/order.service';
import { CartService } from 'src/app/common/services/cart.service';
import { CommonService } from 'src/app/common/services/common.service';

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
  constructor(public _service: OrderService,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _router: Router,
    private _commonService: CommonService) {
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

  reorder() {
    let cartEntity = {
      storeId: this.orderEntity.store && this.orderEntity.store.id,
      total: this.orderEntity.billTotal,
      items: this.orderEntity.orderProductLstDTO
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

  cancelOrder(cancelTemplate: TemplateRef<any>) {
    // this._modalService.open(cancelTemplate, { centered: true });
  }

  cancel(id: string) {
    this._service.cancelOrder(id).subscribe(() => {
    //   this._modalService.dismissAll();
      // show success snackbar
    //   this._toastService.show(`Order #${id} cancelled successfully`);
      this._router.navigate(['/order']);
    }, () => {
    //   this._modalService.dismissAll();
      // show failed snackbar
    //   this._toastService.show(`Failed to cancel order #${id}`);
    });
  }

}

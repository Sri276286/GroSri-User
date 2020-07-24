import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersMap = new Map();
  constructor(private _http: HttpClient,
    private _commonService: CommonService) {

  }

  getOrders() {
    // let params = new HttpParams();
    // params = params.append('inprogress', 'true');
    return this._http.get(ApiConfig.ordersListURL)
      .pipe(map((res: any) => {
        const orders = res && res.orders;
        this._commonService.ordersPlaced = orders;
        return res;
      }));
  }

  getCurrentOrders() {
    let params = new HttpParams();
    params = params.append('inProgress', 'true');
    return this._http.get(ApiConfig.ordersListURL, { params })
      .pipe(map((res: any) => {
        const orders = res && res.orders;
        return this.mapOrdersWithStatus(orders);
      }));
  }

  getPastOrders() {
    let params = new HttpParams();
    params = params.append('history', 'true');
    return this._http.get(ApiConfig.ordersListURL, { params })
      .pipe(map((res: any) => {
        const orders = res && res.orders;
        return this.mapOrdersWithStatus(orders);
      }));
  }

  /**
   * Get the recent active order
   */
  getCurrentOrder() {
    let params = new HttpParams();
    params = params.append('inProgress', 'true');
    return this._http.get(ApiConfig.ordersListURL, { params })
      .pipe(map((res: any) => {
        let orders = res && res.orders;
        orders = this.mapOrdersWithStatus(orders);
        // As last is the latest by id
        const order = orders && orders.length && orders[orders.length - 1];
        return order;
      }));
  }

  getOrderById(id) {
    return this._http.get(`${ApiConfig.orderURL}/${id}`);
  }

  cancelOrder(id: string) {
    return this._http.put(`${ApiConfig.orderURL}/${id}/orderStatus/CUSTOMER_CANCELLED`, null);
  }

  private mapOrdersWithStatus(orders: any) {
    return orders.map((order) => {
      // map data in display format
      order.estimatedDate = order.estimatedDate ? this._commonService.getDisplayDate(order.estimatedDate) : '';
      switch (order.orderStatus) {
        case 'PLACED':
          order.statusMessage = 'Placed';
          break;
        case 'ACCEPTED':
          order.statusMessage = 'Accepted';
          break;
        case 'CUSTOMER_CANCELLED':
          order.statusMessage = 'Cancelled';
          break;
        case 'STORE_CANCELLED':
          order.statusMessage = 'Rejected By Store';
          break;
        case 'PREPARE':
          order.statusMessage = 'Preparing';
          break;
        case 'READY':
          order.statusMessage = 'Ready';
          break;
        case 'DELIVERED':
          order.statusMessage = 'Delivered';
          break;
        default:
          order.statusMessage = 'Error';
      }
      return order;
    });
  }
}

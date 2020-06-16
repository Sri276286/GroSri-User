import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getOrderById(id) {
    return this._http.get(`${ApiConfig.orderURL}/${id}`);
  }

  cancelOrder(id: string) {
    return this._http.put(`${ApiConfig.orderURL}/${id}/orderStatus/CUSTOMER_CANCELLED`, null);
  }
}

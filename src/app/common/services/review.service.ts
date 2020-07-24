import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _http:HttpClient) { }

  addReview(review) {
    //return this._http.post("", review);
    const simpleObservable = new Observable((observer) => {
    
      // observable execution
      observer.next("review updated successfully");
      observer.complete()
  });
  return simpleObservable;
  }

  getReview(storeId: number,userid: String,productid: number){
    let params=new HttpParams();
    params.set("storeId",storeId);
    params.set("userid",userid);
    params.set("productid",productid);


    return this._http.get("",{params: params})
  }
}

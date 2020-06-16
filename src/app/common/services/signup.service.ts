import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http: HttpClient) { }

  doSignUp(signUpform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(
      ApiConfig.signupURL,
      JSON.stringify(signUpform.value),
      options
    );
  }
}

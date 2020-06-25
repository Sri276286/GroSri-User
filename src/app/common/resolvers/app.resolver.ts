import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppResolver implements Resolve<any> {

    constructor(private _errorService: ErrorService) { }

    resolve(): Observable<any> {
        console.log('abc');
        return of([]).pipe(tap(() => {
            this._errorService.getErrorList();
        }));

    }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'page-not-found.page.html'
})
export class PageNotFoundPage {
    constructor(private _router: Router) { }
    goBack() {
        this._router.navigate(['/user']);
    }
}
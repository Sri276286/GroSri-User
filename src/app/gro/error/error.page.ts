import { Component, OnInit, Input } from '@angular/core';
import { ErrorService } from 'src/app/common/services/error.service';

@Component({
    selector: 'gro-error',
    templateUrl: 'error.page.html',
    styleUrls: ['./error.page.scss']
})
export class ErrorPage implements OnInit {
    @Input() type: string;
    errorEntity;
    constructor(private _errorService: ErrorService) {
    }

    ngOnInit() {
        switch (this.type) {
            case 'storeList':
                this.errorEntity = this._errorService.getErrorByType(this.type);
                console.log('error ', this.errorEntity);
                break;
            default:
        }
        console.log('error ', this.errorEntity);
    }
}
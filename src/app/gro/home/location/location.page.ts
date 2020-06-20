import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
    templateUrl: 'location.page.html'
})
export class LocationModalPage implements OnInit {
    queryField: FormControl = new FormControl();
    showClear = false;
    locations = [];
    constructor(public modalCtrl: ModalController,
        private homeService: HomeService) {
    }

    ngOnInit() {
        this.homeService.getLocations().subscribe((res: any) => {
            this.locations = res;
        });
        this.queryField.valueChanges
            .pipe(debounceTime(1000))
            .subscribe((result) => {
                console.log('search res ', result);
                if (result && result.length) {
                    this.showClear = true;
                } else {
                    this.showClear = false;
                }
            });
    }

    clearSearch() {
        this.queryField.setValue('');
    }
}
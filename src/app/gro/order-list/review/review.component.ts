import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from 'src/app/common/services/review.service';
import { CommonService } from 'src/app/common/services/common.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})

export class OrderReviewPage {
  @Input('order') order;
  ratingIndex = 0;
  textIndex = '';
  comments = '';

  constructor(private _reviewService: ReviewService,
    private _commonService: CommonService,
    private modalCtrl: ModalController) { }


  updateRatingIndex(index: number) {
    this.ratingIndex = index;
    if (this.ratingIndex === 1) {
      this.textIndex = 'Not Happy';
    } else if (this.ratingIndex === 2) {
      this.textIndex = 'Ok';
    } else if (this.ratingIndex === 3) {
      this.textIndex = 'Happy';
    } else {
      this.textIndex = '';
    }
  }

  submit() {
    const review = {
      storeId: this.order.store.id,
      orderId: this.order.id,
      rating: this.ratingIndex,
      comments: this.comments
    }
    this._reviewService.addReview(review).subscribe(() => {
      this.comments = '';
      this.modalCtrl.dismiss();
      this._commonService.presentToast(`Thanks for your valuable feedback and time`);
    }, (error => {
      this._commonService.presentToast(`Sorry we are down. Please try after sometime`);
    }));
  }

}

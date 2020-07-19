import { Component, OnInit,Input } from '@angular/core';
import { ReviewService } from '../../common/services/review.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})

export class ReviewComponent implements OnInit {
  @Input('item') cart;
  ratingIndex=-1;
  reviewError="";
  review: string;
  textIndex="";
  comments="";
  status;

  constructor(private _reviewService:ReviewService,public toastController: ToastController) {  }

  ngOnInit() {
  }

  updateRatingIndex(index: number){
    this.ratingIndex=index;
    if(this.ratingIndex == 0){
      this.textIndex="Not Happy";
    }else if(this.ratingIndex == 1){
      this.textIndex="Ok";

    }else if(this.ratingIndex == 2){
      this.textIndex="Happy";

    }else{
      this.textIndex="";
    }
  }

  submit(){
    this.review= '{"storeId": "'+this.storeId+'","id":"'+ this.id+'","ratingIndex":"'+this.ratingIndex+'","comments":"'+this.comments+'"}';
    console.log(this.review);
    if(this.ratingIndex == -1){
      this.reviewError="Rating is mandatory";

    }else {
      this._reviewService.addReview(JSON.parse(this.review)).subscribe((res) => {
        this.status=res;
        this.presentToastWithOptions(this.status);
    },(error => {
      this.status=error;
        this.presentToastWithOptions(this.status);
    }));
    }
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 2000,
      //color:'blur',
     // cssClass:'toast-container'
      

    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productreview',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.scss'],
})
export class ProductreviewComponent implements OnInit {

  private overallRating: string;
  private overallJson: JSON;

  constructor() { }

  ngOnInit() {
    this.overallRating='{"averageRating": 4.4,"noOfReviewed":15, "groupByrating": [{"rating": 3,"persons": 10},{ "rating": 2, "persons": 5 }],"reviews": [{"review": "comment","rating": "3","userId": "abc@gmail.com" },{"review": "nice product","rating": "2", "userId": "def@gmail.com" },{ "review": "Good product but delivery can be fast","rating": "2","userId": "test@gmail.com" }]}';
    this.overallJson=JSON.parse(this.overallRating);
  }

}

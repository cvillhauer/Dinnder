import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../model/restaurant';

@Component({
  selector: 'restaurant',
  template: `
  <br/><br/>
  <div class="col-xs-12" *ngIf="restaurants && restaurants[counter]">
      <h4>{{restaurants[counter].name}} &nbsp; {{restaurants[counter].price}} &nbsp;
      <img src="{{buildYelpStarImage}}"/></h4>
      <a href="{{restaurants[counter].url}}"><img width="500"
      src="{{restaurants[counter].image_url}}" title="{{restaurants[counter].name}}"/></a>
  </div>
  <div class="col-xs-12" *ngIf="resultsExhausted"><p>No more restaurants available. Please alter your search terms.</p></div>
  <div class="col-xs-12" *ngIf="loading"><p>Loading...</p></div>
  `,
  styles: []
})
export class RestaurantComponent implements OnInit {
  @Input() restaurants: Restaurant[] = [];
  @Input() loading = false;
  @Input() buildYelpStarImage: any;
  @Input() counter = 0;
  @Input() resultsExhausted = false;
  constructor() { }
  ngOnInit() {
  }

}

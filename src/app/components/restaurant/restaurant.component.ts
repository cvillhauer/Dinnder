import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Restaurant } from '../../model/restaurant';

@Component({
  selector: 'restaurant',
  template: `
  <br/><br/>

    <div class="col-xs-12" *ngIf="restaurants && restaurants[counter]">
      <div class="col-xs-1 pagination" *ngIf="counter > 0">
        <li><a href="#" (click)="onPrevious()"><</a></li>
      </div>
      <h4>{{restaurants[counter].name}} &nbsp; {{restaurants[counter].price}} &nbsp;
            <img src="{{buildYelpStarImage}}"/>&nbsp;
            <span *ngIf="delivers">**</span>
      </h4>

      <div class="col-xs-10">
        <a href="{{restaurants[counter].url}}">
          <img width="500" src="{{restaurants[counter].image_url}}" title="{{restaurants[counter].name}}">
        </a>
      </div>
      <div class="col-xs-1 pagination" *ngIf="counter < (restaurants.length - 1)">
        <li><a href="#" (click)="onNext()">></a></li>
      </div>
    </div>

  <div class="col-xs-12" *ngIf="noResults"><p>No restaurants match. Please alter your search terms.</p></div>
  <div class="col-xs-12" *ngIf="resultsExhausted"><p>No more restaurants available. Please alter your search terms.</p></div>
  <div class="col-xs-12" *ngIf="loading"><p>Loading...</p></div>
  `,
  styles: []
})
export class RestaurantComponent implements OnChanges {
  @Input() restaurants: Restaurant[] = [];
  @Input() loading = false;
  @Input() buildYelpStarImage: any;
  @Input() counter = 0;
  @Input() resultsExhausted = false;
  @Input() noResults = false;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() previous: EventEmitter<void> = new EventEmitter();
  onNext() { this.next.emit(); }
  onPrevious() { this.previous.emit(); }
  ngOnChanges(): void {
    console.log('current restaurant', this.restaurants[this.counter]);
  }
  get delivers() {
    return this.restaurants[this.counter].transactions.some(t => t === 'delivery');
  }
}

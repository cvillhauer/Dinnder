import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { Category } from '../../model/category';

@Component({
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styles: []
})
export class RestaurantComponent {
  @Input() restaurants: Restaurant[] = [];
  @Input() loading = false;
  @Input() buildYelpStarImage: any;
  @Input() counter = 0;
  @Input() resultsExhausted = false;
  @Input() noResults = false;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() previous: EventEmitter<void> = new EventEmitter();
  @Output() switchCategory: EventEmitter<Category> = new EventEmitter();
  onNext() { this.next.emit(); }
  onPrevious() { this.previous.emit(); }
  onSwitch(category) { this.switchCategory.emit(category); }
}

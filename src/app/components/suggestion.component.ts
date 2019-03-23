import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { Category } from '../model/category';
import { BusinessService } from '../services/business.service';
import { CategoryService } from '../services/category.service';
import { SearchParams } from '../model/search-params';
import { YelpRatingService } from '../services/yelp-rating.service';

@Component({
  selector: 'suggestion',
  template:
  `<div class="row">
    <search [categories]="categories" (OnSuggest)="suggest($event)"></search>
  </div>
  <div class="row">
    <restaurant [restaurants]="restaurants"
      [loading]="loading" [buildYelpStarImage]="buildYelpStarImage"
      [counter]="counter" [resultsExhausted]="resultsExhausted"
      (next)="next()" (previous)="previous()" ></restaurant>
  </div>
  `
})

export class SuggestionComponent implements OnInit {
  counter = 0;
  offset = 0;
  restaurantLimit = 20;
  resultsExhausted = false;
  firstSuggestion = true;
  restaurants: Restaurant[] = [];
  categories: Category[] = [];
  constructor(private busService: BusinessService, private catService: CategoryService, private yelpRatingService: YelpRatingService) {}
  get loading() {
    return !this.firstSuggestion && !this.resultsExhausted && (!this.restaurants || !this.restaurants[this.counter]);
  }
  get buildYelpStarImage() {
    return this.restaurants[this.counter] ? this.yelpRatingService.buildYelpStarImage(this.restaurants[this.counter].rating) : '';
  }
  ngOnInit() {
    this.catService.getCategories().subscribe(cats => {
      // console.log('cats', cats);
      this.categories = cats;
    });
  }
  suggest(params: SearchParams) {
    console.log('SearchParams', params);
    this.counter = 0;
    this.firstSuggestion = false;
    this.busService.getBusinesses(this.buildParams(params)).subscribe(restaurants => this.restaurants = restaurants);
  }
  buildParams(params: SearchParams): SearchParams {
    params.limit = this.restaurantLimit.toString();
    params.offset = this.offset.toString();
    return params;
  }
  next() {
    // this.counter++; this.offset += this.restaurantLimit;
    if (this.resultsExhausted) {
      return;
    } else if (!this.restaurants || this.counter + 1 >= this.restaurants.length) {
      if (!this.firstSuggestion) {
          if (this.restaurants.length < this.restaurantLimit) {
              this.resultsExhausted = true;
          }
          this.offset += this.restaurantLimit;
      }
      this.counter = 0;
      this.restaurants = [];
      this.firstSuggestion = false;
    } else {
      this.counter += 1;
    }
  }
  previous() { this.counter--; }
}

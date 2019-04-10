import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { Category } from '../../model/category';
import { BusinessService } from '../../services/business.service';
import { CategoryService } from '../../services/category.service';
import { SearchParams } from '../../model/search-params';
import { YelpRatingService } from '../../services/yelp-rating.service';

@Component({
  selector: 'suggestion',
  templateUrl: 'suggestion.component.html'
})

export class SuggestionComponent implements OnInit {
  counter = 0;
  offset = 0;
  restaurantLimit = 20;
  resultsExhausted = false;
  restaurants: Restaurant[] = [];
  categories: Category[] = [];
  hasSearched = false;
  searchRunning = false;
  constructor(private busService: BusinessService, private catService: CategoryService, private yelpRatingService: YelpRatingService) {}
  get loading() {
    return this.searchRunning;
  }
  get noResult() {
    return this.hasSearched && this.restaurants.length === 0;
  }
  get buildYelpStarImage() {
    return this.restaurants[this.counter] ? this.yelpRatingService.buildYelpStarImage(this.restaurants[this.counter].rating) : '';
  }
  ngOnInit() {
    this.catService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }
  suggest(params: SearchParams) {
    console.log('SearchParams', params);
    this.counter = 0;
    this.hasSearched = false;
    this.restaurants = [];
    this.searchRunning = true;
    this.busService.getBusinesses(this.buildParams(params))
      .subscribe(restaurants => {
        this.restaurants = restaurants;
        this.searchRunning = false;
        this.hasSearched = true;
      },
      (err) => {
        this.searchRunning = false;
        this.hasSearched = true;
      });
  }
  buildParams(params: SearchParams): SearchParams {
    params.limit = this.restaurantLimit.toString();
    params.offset = this.offset.toString();
    return params;
  }
  next() {
    this.counter++; // this.offset += this.restaurantLimit;
    // console.log('counter', this.counter, 'restaurants', this.restaurants.length);
    if (this.counter > this.restaurants.length) {
      this.resultsExhausted = true;
    } else {
      this.resultsExhausted = false;
    }
  }
  previous() { this.counter--; }
}

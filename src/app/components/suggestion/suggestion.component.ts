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
  resultsExhausted = false;
  restaurants: Restaurant[] = [];
  categories: Category[] = [];
  hasSearched = false;
  searchRunning = false;
  switchedCategory: Category;
  constructor(private busService: BusinessService, private catService: CategoryService, private yelpRatingService: YelpRatingService) { }
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
        //Adding in a randomizer so that users aren't constantly presented with the same restaurant
        //Not the most random or the most performant, but our array is <= 50 items so who cares?
        //https://stackoverflow.com/a/46545530/3053913
        this.restaurants = restaurants
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
        this.searchRunning = false;
        this.hasSearched = true;
      },
        (err) => {
          this.searchRunning = false;
          this.hasSearched = true;
        });
  }
  buildParams(params: SearchParams): SearchParams {
    params.offset = this.offset.toString();
    return params;
  }
  next() {
    this.counter++;
    if (this.counter > this.restaurants.length) {
      this.resultsExhausted = true;
    } else {
      this.resultsExhausted = false;
    }
  }
  previous() {
    this.counter--;
  }
}

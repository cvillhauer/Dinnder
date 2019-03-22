import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { Category } from '../model/category';
import { BusinessService } from '../services/business.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'suggestion',
  template:
  `<div class="row">
    <div class="col-xs-9">
        <label>Location:</label>
        <input class="form-control" [(ngModel)]="location" (keydown.enter)="suggest()" (change)="searchChange()" />
        <br/>
        <label>Category: (optional)</label>
        <select class="form-control" [(ngModel)]="selectedCategory" (change)="searchChange()">
            <option></option>
            <option *ngFor="let category of categories" [ngValue]="category">{{category.title}}</option>
        </select>
    </div>
    <div class="col-xs-3">
        <label>Distance:</label>
        <input class="form-control" [(ngModel)]="distance" (change)="searchChange()" />
        <br/>
        <button type="button" class="form-control btn btn-default" style="margin-top: 25px;" (click)="suggest()">Suggest</button>
    </div>
  </div>
  <div class="row">
    <br/><br/>
    <div class="col-xs-12" *ngIf="restaurants && restaurants[counter]">
        <h4>{{restaurants[counter].name}} &nbsp; {{restaurants[counter].price}} &nbsp;
        <img src="{{buildYelpStarImage(restaurants[counter].rating)}}"/></h4>
        <a href="{{restaurants[counter].url}}"><img width="500"
        src="{{restaurants[counter].image_url}}" title="{{restaurants[counter].name}}"/></a>
    </div>
    <div class="col-xs-12" *ngIf="resultsExhausted"><p>No more restaurants available. Please alter your search terms.</p></div>
    <div class="col-xs-12" *ngIf="loading"><p>Loading...</p></div>
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
  location: string;
  selectedCategory: Category;
  categories: Category[] = [];
  distance = 5;
  constructor(private busService: BusinessService, private catService: CategoryService) {}
  get loading() {
    return !this.firstSuggestion && !this.resultsExhausted && (!this.restaurants || !this.restaurants[this.counter]);
  }
  ngOnInit() {
    this.catService.getCategories().subscribe(cats => {
      // console.log('cats', cats);
      this.categories = cats;
    });
  }
  suggest() {
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
        const params = this.buildParams();
        this.busService.getBusinesses(params).subscribe(restaurants => this.restaurants = restaurants);
    } else {
        this.counter += 1;
    }
  }
  searchChange() {
      this.resultsExhausted = false;
      this.firstSuggestion = true;
      this.counter = 0;
      this.offset = 0;
      this.restaurants = [];
      this.suggest();
  }
  buildParams(): HttpParams {
      let params = new HttpParams();
      params = params.append('term', 'restaurant');
      params = params.append('open_now', 'true');
      params = params.append('location', this.location);
      if (this.selectedCategory && this.selectedCategory.alias) {
          params = params.append('categories', this.selectedCategory.alias);
      }
      if (this.distance) {
          let distanceInMeters = this.distance * 1609; // 1609 meters to a mile
          if (distanceInMeters > 40000) {
              distanceInMeters = 40000; // Maximum searchable distance is 40000 meters, almost 25 miles
          }
          params = params.append('radius', distanceInMeters.toString());
      }
      params = params.append('limit', this.restaurantLimit.toString());
      params = params.append('offset', this.offset.toString());
      return params;
  }
  buildYelpStarImage(rating: number) {
      let yelpStarImageUrl = './assets/yelp/large/large_';
      if (Math.floor(rating) === rating) {
          yelpStarImageUrl += rating;
      } else {
          yelpStarImageUrl += Math.floor(rating) + '_half';
      }
      yelpStarImageUrl += '.png';
      return yelpStarImageUrl;
  }
}

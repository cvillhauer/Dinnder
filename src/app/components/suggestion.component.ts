import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiBaseCallComponent } from '../components/apibasecall.component';

import { Restaurant } from '../model/restaurant';

@Component({
  selector: 'suggestion',
  template:
  `<div class="row">
    <div class="col-xs-9">
        <label>Location: </label>
        <input class="form-control" [(ngModel)]="location" (keydown.enter)="suggest()" (change)="locationChange()" />
    </div>
    <div class="col-xs-3">
        <button type="button" class="btn btn-default" style="margin-top: 25px;" (click)="suggest()">Suggest</button>
    </div>
  </div>
  <div class="row">
    <br/><br/>
    <div *ngIf="restaurants && restaurants[counter]" style="text-align: center;">
        <h4>{{restaurants[counter].name}} &nbsp; {{restaurants[counter].price}} &nbsp; <img src="{{buildYelpStarImage(restaurants[counter].rating)}}"/></h4>
        <a href="{{restaurants[counter].url}}"><img width="500" src="{{restaurants[counter].image_url}}" title="{{restaurants[counter].name}}"/></a>
    </div>
    <div *ngIf="(!restaurants || !restaurants[counter]) && !firstSuggestion"><p>Loading...</p></div>
  </div>
  `
})

export class SuggestionComponent extends ApiBaseCallComponent {
    public location: string;
    public counter: number = 0;
    public offset: number = 0;
    public restaurants: Restaurant[];
    public restaurantLimit: number = 20;
    public firstSuggestion: boolean = true;

    public searchByLocationOnlyUrl: string = "https://api.yelp.com/v3/businesses/search";

    suggest(){
        if(!this.restaurants || this.counter + 1 >= this.restaurants.length){
            if(!this.firstSuggestion){
                this.offset += this.restaurantLimit;
            }
            this.counter = 0;
            this.restaurants = [];
            this.firstSuggestion = false;
            let params = new HttpParams();
            params = params.append('location', this.location);
            params = params.append('limit', this.restaurantLimit.toString());
            params = params.append('offset', this.offset.toString());
            this.getRestaurantsData(params).then(restaurants => this.restaurants = restaurants);
        }
        else {
            this.counter += 1;
        }
    }

    locationChange(){
        console.log("Changing location...");
        this.firstSuggestion = true;
        this.counter = 0;
        this.offset = 0;
        this.restaurants = [];
        this.suggest();
    }

    getRestaurantsData(params: HttpParams): Promise<Restaurant[]> {
        return super.apiGetRequestWithParams(this.searchByLocationOnlyUrl, params)
        .then(response => response.businesses as Restaurant[]);
    }

    buildYelpStarImage(rating: number){
        let yelpStarImageUrl = "./assets/yelp/large/large_";
        if(Math.floor(rating) === rating){
            yelpStarImageUrl += rating;
        }
        else {
            yelpStarImageUrl += Math.floor(rating) + "_half";
        }
        yelpStarImageUrl += ".png";
        return yelpStarImageUrl;
    }
}

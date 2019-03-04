import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiBaseCallComponent } from '../components/apibasecall.component';

import { Restaurant } from '../model/restaurant';
import { Category } from '../model/category';

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
        <h4>{{restaurants[counter].name}} &nbsp; {{restaurants[counter].price}} &nbsp; <img src="{{buildYelpStarImage(restaurants[counter].rating)}}"/></h4>
        <a href="{{restaurants[counter].url}}"><img width="500" src="{{restaurants[counter].image_url}}" title="{{restaurants[counter].name}}"/></a>
    </div>
    <div class="col-xs-12" *ngIf="resultsExhausted"><p>No more restaurants available. Please alter your search terms.</p></div>
    <div class="col-xs-12" *ngIf="!firstSuggestion && !resultsExhausted && (!restaurants || !restaurants[counter])"><p>Loading...</p></div>
  </div>
  `
})

export class SuggestionComponent extends ApiBaseCallComponent {
    public counter: number = 0;
    public offset: number = 0;
    public restaurantLimit: number = 20;
    public resultsExhausted: boolean = false;
    public firstSuggestion: boolean = true;
    public restaurants: Restaurant[];

    public location: string;
    public selectedCategory: Category;
    public distance: number = 5;

    public categories: Category[] = [
        { alias: "tradamerican", title: "American (Traditional)"},
        { alias: "bbq", title: "Barbeque"},
        { alias: "breakfast_brunch", title: "Breakfast & Brunch"},
        { alias: "buffets", title: "Buffets"},
        { alias: "burgers", title: "Burgers"},
        { alias: "chicken_wings", title: "Chicken Wings"},
        { alias: "chinese", title: "Chinese"},
        { alias: "delis", title: "Delis"},
        { alias: "diners", title: "Diners"},
        { alias: "hotdogs", title: "Fast Food"},
        { alias: "greek", title: "Greek"},
        { alias: "indian", title: "Indian"},
        { alias: "irish", title: "Irish"},
        { alias: "italian", title: "Italian"},
        { alias: "japanese", title: "Japanese"},
        { alias: "korean", title: "Korean"},
        { alias: "mexican", title: "Mexican"},
        { alias: "noodles", title: "Noodles"},
        { alias: "pizza", title: "Pizza"},
        { alias: "salad", title: "Salad"},
        { alias: "sandwiches", title: "Sandwiches"},
        { alias: "seafood", title: "Seafood"},
        { alias: "soulfood", title: "Soul Food"},
        { alias: "soup", title: "Soup"},
        { alias: "southern", title: "Southern"},
        { alias: "steak", title: "Steakhouses"},
        { alias: "sushi", title: "Sushi Bars"},
        { alias: "tex-mex", title: "Tex-Mex"},
        { alias: "thai", title: "Thai"},
        { alias: "vegan", title: "Vegan"},
        { alias: "vegetarian", title: "Vegetarian"},
        { alias: "vietnamese", title: "Vietnamese"},
        { alias: "wraps", title: "Wraps"}
    ];

    public searchByLocationUrl: string = "https://api.yelp.com/v3/businesses/search";

    suggest(){
        if(this.resultsExhausted){
            return;
        }
        else if(!this.restaurants || this.counter + 1 >= this.restaurants.length){
            if(!this.firstSuggestion){
                if(this.restaurants.length < this.restaurantLimit){
                    this.resultsExhausted = true;
                }
                this.offset += this.restaurantLimit;
            }
            this.counter = 0;
            this.restaurants = [];
            this.firstSuggestion = false;
            let params = this.buildParams();
            this.getRestaurantsData(params).then(restaurants => this.restaurants = restaurants);
        }
        else {
            this.counter += 1;
        }
    }

    searchChange(){
        this.resultsExhausted = false;
        this.firstSuggestion = true;
        this.counter = 0;
        this.offset = 0;
        this.restaurants = [];
        this.suggest();
    }

    buildParams(): HttpParams{
        let params = new HttpParams();
        params = params.append("term", "restaurant");
        params = params.append("open_now", "true");
        params = params.append("location", this.location);
        if(this.selectedCategory && this.selectedCategory.alias){
            params = params.append("categories", this.selectedCategory.alias);
        }
        if(this.distance){
            let distanceInMeters = this.distance * 1609; //1609 meters to a mile
            if(distanceInMeters > 40000){
                distanceInMeters = 40000; //Maximum searchable distance is 40000 meters, almost 25 miles
            }
            params = params.append("radius", distanceInMeters.toString());
        }
        params = params.append("limit", this.restaurantLimit.toString());
        params = params.append("offset", this.offset.toString());
        return params;
    }

    getRestaurantsData(params: HttpParams): Promise<Restaurant[]> {
        return super.apiGetRequestWithParams(this.searchByLocationUrl, params)
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

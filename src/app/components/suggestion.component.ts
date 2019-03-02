import { Component } from '@angular/core';

import { ApiBaseCallComponent } from '../components/apibasecall.component';

import { Restaurant } from '../model/restaurant';

@Component({
  selector: 'suggestion',
  template:
  `<div class="row">
    <div class="col-xs-9">
        <label>Location: </label>
        <input class="form-control" [(ngModel)]="location" />
    </div>
    <div class="col-xs-3">
        <button type="button" class="btn btn-default" style="margin-top: 25px;" (click)="suggest(counter)">Suggest</button>
    </div>
  </div>
  <div class="row">
    <br/><br/>
    <div *ngFor="let restaurant of restaurants">
        <p>{{restaurant.name}}</p>
    </div>
  </div>
  `
})

export class SuggestionComponent extends ApiBaseCallComponent {
    public location: string = "Nashville";
    public counter: number = 0;
    public restaurants: Restaurant[];

    public searchByLocationOnlyUrl: string = "https://api.yelp.com/v3/businesses/search?location=Nashville";

    suggest(){
        console.log(this.location + " " + this.counter);
        this.counter += 1;
        this.getRestaurantsData().then(restaurants => this.restaurants = restaurants);
    }

    getRestaurantsData(): Promise<Restaurant[]> {
        return super.apiGetRequest(this.searchByLocationOnlyUrl)
        .then(response => response.json().businesses as Restaurant[]);
    }
}

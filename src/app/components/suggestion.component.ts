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
        <input class="form-control" [(ngModel)]="location" (keydown.enter)="suggest(counter)" />
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
    public location: string;
    public counter: number = 0;
    public restaurants: Restaurant[];

    public searchByLocationOnlyUrl: string = "https://api.yelp.com/v3/businesses/search";

    suggest(){
        console.log(this.location + " " + this.counter);
        this.counter += 1;
        let params = new HttpParams();
        params = params.append('location', this.location);
        this.getRestaurantsData(params).then(restaurants => this.restaurants = restaurants);
    }

    getRestaurantsData(params: HttpParams): Promise<Restaurant[]> {
        return super.apiGetRequestWithParams(this.searchByLocationOnlyUrl, params)
        .then(response => response.businesses as Restaurant[]);
    }
}

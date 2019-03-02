import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ApiBaseCallComponent } from './apibasecall.component';
import { Category } from '../model/category';

@Component({
  selector: 'categories',
  template:
  `<div>
    <div *ngFor="let category of categories">
        {{category.title}}
    </div>
  </div>
  `
})

export class CategoriesComponent extends ApiBaseCallComponent {

  public getApi: string = "https://api.yelp.com/v3/categories";

  public categories: Category[];

    constructor(public http: Http) {
      super(http);
     }

    ngOnInit(): void {
        this.getCategoriesData().then(categories => this.categories = categories);
    }

    getCategoriesData(): Promise<Category[]> {
        return super.apiGetRequest(this.getApi)
        .then(response => response.json().categories as Category[]);
    }
}

import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

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

export class CategoriesComponent {
  private headers = new Headers();
  private apiKey = "iQs04ljFIuuD88ShazdNj_TP0VlrQuN2lm5iIu4hd4jjCwReExISjHVYJxv0ZmoB1-6cIUvwL25azbr9lXUD3fgzyavRzQjJ0Ai0s6Glq0b9-321-bjhhfA7acN6XHYx";
  private proxyUrl = "https://cors-anywhere.herokuapp.com/";

  public categories: Category[];

    constructor(private http: Http) { }

    ngOnInit(): void {
        this.getUserData().then(categories => this.categories = categories);
    }

    getUserData(): Promise<Category[]> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', ('Bearer ' + this.apiKey));
        return this.http.get(this.proxyUrl + "https://api.yelp.com/v3/categories", { headers: this.headers })
            .toPromise()
            .then(response => response.json().categories as Category[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

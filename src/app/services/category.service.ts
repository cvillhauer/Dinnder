import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { alias: 'tradamerican', title: 'American (Traditional)'},
    { alias: 'bbq', title: 'Barbeque'},
    { alias: 'breakfast_brunch', title: 'Breakfast & Brunch'},
    { alias: 'buffets', title: 'Buffets'},
    { alias: 'burgers', title: 'Burgers'},
    { alias: 'chicken_wings', title: 'Chicken Wings'},
    { alias: 'chinese', title: 'Chinese'},
    { alias: 'delis', title: 'Delis'},
    { alias: 'diners', title: 'Diners'},
    { alias: 'hotdogs', title: 'Fast Food'},
    { alias: 'greek', title: 'Greek'},
    { alias: 'indian', title: 'Indian'},
    { alias: 'irish', title: 'Irish'},
    { alias: 'italian', title: 'Italian'},
    { alias: 'japanese', title: 'Japanese'},
    { alias: 'korean', title: 'Korean'},
    { alias: 'mexican', title: 'Mexican'},
    { alias: 'noodles', title: 'Noodles'},
    { alias: 'pizza', title: 'Pizza'},
    { alias: 'salad', title: 'Salad'},
    { alias: 'sandwiches', title: 'Sandwiches'},
    { alias: 'seafood', title: 'Seafood'},
    { alias: 'soulfood', title: 'Soul Food'},
    { alias: 'soup', title: 'Soup'},
    { alias: 'southern', title: 'Southern'},
    { alias: 'steak', title: 'Steakhouses'},
    { alias: 'sushi', title: 'Sushi Bars'},
    { alias: 'tex-mex', title: 'Tex-Mex'},
    { alias: 'thai', title: 'Thai'},
    { alias: 'vegan', title: 'Vegan'},
    { alias: 'vegetarian', title: 'Vegetarian'},
    { alias: 'vietnamese', title: 'Vietnamese'},
    { alias: 'wraps', title: 'Wraps'}
];
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
      // return this.httpClient.get<Categories>(`${environment.proxyUrl}${environment.categoriesApiUrl}`).pipe(
      //   // tap(cObj => console.log('cObj.categories: ', cObj.categories) ),
      //   map(cObj => cObj.categories.filter(c => c.parent_aliases.some(v => v === 'restaurants')) )
      // );
  }
  addCategory(category: Category) {
    this.categories.push(category);
  }
}

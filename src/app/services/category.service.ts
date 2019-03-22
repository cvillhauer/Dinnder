import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Categories } from '../model/category';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
      return this.httpClient.get<Categories>(`${environment.proxyUrl}${environment.categoriesApiUrl}`).pipe(
        // tap(cObj => console.log('cObj.categories: ', cObj.categories) ),
        map(cObj => cObj.categories.filter(c => c.parent_aliases.some(v => v === 'restaurants')) )
      );
  }
}

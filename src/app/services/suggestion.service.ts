import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private categorySubject = new BehaviorSubject<Category>({alias: '', title: '' });
  category$ = this.categorySubject.asObservable();
  constructor() { }
  set category(category: Category) {
    // console.log('SuggestionService category', category);
    this.categorySubject.next(category);
  }
}

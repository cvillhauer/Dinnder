import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { SearchParams } from '../../model/search-params';
import { environment } from '../../../environments/environment';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'search',
  template: `
  <div class="row">
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
  `,
  styles: []
})
export class SearchComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() OnSuggest: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  selectedCategory: Category;
  distance = 5;
  location: string;
  constructor(private catService: CategoryService, private suggestionService: SuggestionService) { }
  ngOnInit() { }
  suggest() {
    const params = Object.assign({}, environment.searchParams);
    params.location = this.location;
    params.categories = this.selectedCategory ? this.selectedCategory.alias : '';
    params.radius = this.deriveRadius();
    this.OnSuggest.emit(params);
  }
  searchChange() {
      this.suggest();
  }
  deriveRadius() {
    if (this.distance) {
      let distanceInMeters = this.distance * 1609; // 1609 meters to a mile
      if (distanceInMeters > 40000) {
          distanceInMeters = 40000; // Maximum searchable distance is 40000 meters, almost 25 miles
      }
      return distanceInMeters.toString();
    } else {
      return (5 * 1609).toString();
    }
  }
}

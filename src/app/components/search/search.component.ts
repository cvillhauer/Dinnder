import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { SearchParams } from '../../model/search-params';
import { environment } from '../../../environments/environment';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
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

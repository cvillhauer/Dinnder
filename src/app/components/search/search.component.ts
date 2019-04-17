import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class SearchComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  @Output() OnSuggest: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Input() selectedCategory: Category;
  distance = 5;
  location: string;
  latitude = 0;
  longitude = 0;
  constructor(private catService: CategoryService, private suggestionService: SuggestionService) { }
  ngOnInit() {
    this.suggestionService.category$.subscribe(category => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.useCurrentLocation.bind(this));
      }
      const existingCat = this.categories.filter(c => c.alias === category.alias);
      if (existingCat.length > 0) {
        this.selectedCategory = existingCat[0];
      } else if (category.title) {
        this.catService.addCategory(category);
        this.selectedCategory = category;
      }
      this.suggest();
    });
  }
  ngOnChanges(changes) {
    this.suggest();
  }
  suggest() {
    const params = Object.assign({}, environment.searchParams);
    if (this.location) {
      params.location = this.location;
      params.latitude = 0;
      params.longitude = 0;
    } else if (this.latitude && this.longitude) {
      params.latitude = this.latitude;
      params.longitude = this.longitude;
      params.location = undefined;
    } else {
      params.location = 'Nashvlle';
    }
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
  useCurrentLocation(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.suggest();
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuggestionComponent } from './suggestion.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

describe('SuggestionComponent', () => {
  let component: SuggestionComponent;
  let fixture: ComponentFixture<SuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionComponent, SearchComponent, RestaurantComponent ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next should return void', () => {
    expect(component.next()).toBeUndefined();
  });

  it('previous should return void', () => {
    expect(component.previous()).toBeUndefined();
  });

  it('suggest should return void', () => {
    expect(component.suggest({
      term: 'restaurant',
      open_now: 'true',
      location: '',
      latitude: 0,
      longitude: 0,
      categories: '',
      radius: (5 * 1609).toString(),
      sort_by: 'distance',
      limit: '20',
      offset: '0'
    })).toBeUndefined();
  });

  it('previous should return SearchParams', () => {
    expect(component.buildParams({
        term: 'restaurant',
        open_now: 'true',
        location: '',
        latitude: 0,
        longitude: 0,
        categories: '',
        radius: (5 * 1609).toString(),
        sort_by: 'distance',
        limit: '20',
        offset: '0'
      })).toBeDefined();
  });
});

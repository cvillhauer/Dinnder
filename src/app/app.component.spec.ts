import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SuggestionComponent } from './components/suggestion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './components/search/search.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SuggestionComponent, SearchComponent, RestaurantComponent
      ],
      imports: [ FormsModule, HttpClientTestingModule ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Dinnder');
  }));
});

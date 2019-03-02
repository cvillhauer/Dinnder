import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiBaseCallComponent } from './components/apibasecall.component';
import { CategoriesComponent } from './components/categories.component';
import { SuggestionComponent } from './components/suggestion.component';

@NgModule({
  declarations: [ AppComponent, ApiBaseCallComponent, CategoriesComponent, SuggestionComponent ],
  imports: [ BrowserModule, FormsModule, HttpClientModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

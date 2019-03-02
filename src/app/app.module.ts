import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories.component';
import { SuggestionComponent } from './components/suggestion.component';

@NgModule({
  declarations: [ AppComponent, CategoriesComponent, SuggestionComponent ],
  imports: [ BrowserModule, FormsModule, HttpModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

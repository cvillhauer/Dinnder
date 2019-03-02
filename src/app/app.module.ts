import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories';

@NgModule({
  declarations: [ AppComponent, CategoriesComponent ],
  imports: [ BrowserModule, HttpModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { SuggestionComponent } from './components/suggestion.component';
import { AuthInterceptor } from './services/token-interceptor.service';
import { AppErrorHandler } from './error.handler';

@NgModule({
  declarations: [ AppComponent, SuggestionComponent ],
  imports: [ BrowserModule, FormsModule, HttpClientModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
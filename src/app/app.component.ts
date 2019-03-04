import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 
  `
  <div class="container">
    <h1>Dinnder <a target="_blank" href="https://www.yelp.com/"><img width="85px" src="./assets/yelp/logo/Yelp_trademark_RGB.png"/></a></h1>
    <h3>What should I eat for dinner?</h3>
    <br/><br/>
    <suggestion></suggestion>
  </div>
  `
})

export class AppComponent {

}

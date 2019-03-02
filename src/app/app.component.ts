import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 
  `
  <h1>Dinnder <a target="_blank" href="https://www.yelp.com/"><img width="85px" src="../assets/yelp/logo/Yelp_trademark_RGB.png"/></a></h1>
  <h3>What should I eat for dinner?</h3>
  <br/><br/>
  <div class="container">
    <suggestion></suggestion>
    <br/><br/>
    <categories></categories>
  </div>
  `
})

export class AppComponent {

}

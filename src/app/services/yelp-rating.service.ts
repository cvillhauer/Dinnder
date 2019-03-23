import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YelpRatingService {
  buildYelpStarImage(rating: number) {
    let yelpStarImageUrl = './assets/yelp/large/large_';
    if (Math.floor(rating) === rating) {
        yelpStarImageUrl += rating;
    } else {
        yelpStarImageUrl += Math.floor(rating) + '_half';
    }
    yelpStarImageUrl += '.png';
    return yelpStarImageUrl;
  }
}

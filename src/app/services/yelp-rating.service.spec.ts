import { TestBed } from '@angular/core/testing';

import { YelpRatingService } from './yelp-rating.service';

describe('YelpRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YelpRatingService = TestBed.get(YelpRatingService);
    expect(service).toBeTruthy();
  });
});

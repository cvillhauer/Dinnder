import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BusinessService } from './business.service';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BusinessService ]
    });
  });

  afterEach(inject([HttpTestingController], (httpClient: HttpTestingController) => {
    httpClient.verify();
  }));

  it(`should create`, async(inject([BusinessService, HttpTestingController],
    (service: BusinessService, httpClient: HttpTestingController) => {
      expect(service).toBeTruthy();
  })));
});

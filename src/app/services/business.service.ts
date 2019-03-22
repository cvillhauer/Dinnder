import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant, Restaurants } from '../model/restaurant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private httpClient: HttpClient) { }
  getBusinesses(params: HttpParams): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurants>(`${environment.proxyUrl}${environment.businessesApiUrl}`,
      { params: params }).pipe(
      // tap(cObj => console.log('Restaurants: ', cObj) ),
      map(cObj => cObj.businesses )
    );
  }
}

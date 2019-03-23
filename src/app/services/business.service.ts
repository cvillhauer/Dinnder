import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant, Restaurants } from '../model/restaurant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private httpClient: HttpClient) { }
  getBusinesses(params: any): Observable<Restaurant[]> {
    const httpParams: HttpParamsOptions = { fromObject: params } as HttpParamsOptions;
    return this.httpClient.get<Restaurants>(`${environment.proxyUrl}${environment.businessesApiUrl}`,
      { params: new HttpParams(httpParams) }).pipe(
      tap(cObj => console.log('Restaurants: ', cObj) ),
      map(cObj => cObj.businesses )
    );
  }
}

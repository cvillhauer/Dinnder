// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// @Component({
//   selector: 'apibasecall',
//   template: `
//     <div></div>
//   `
// })
// export class ApiBaseCallComponent {
//   private headers: HttpHeaders = new HttpHeaders();
//   private apiKey =
//     'iQs04ljFIuuD88ShazdNj_TP0VlrQuN2lm5iIu4hd4jjCwReExISjHVYJxv0ZmoB1-6cIUvwL25azbr9lXUD3fgzyavRzQjJ0Ai0s6Glq0b9-321-bjhhfA7acN6XHYx';
//   private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

//   constructor(public httpClient: HttpClient) {}

//   apiGetRequest(getUrl: string): Promise<any> {
//     const fullUrl: string = this.proxyUrl + getUrl;
//     return this.httpClient
//       .get(fullUrl, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + this.apiKey
//         }
//       })
//       .toPromise()
//       .catch(this.handleError);
//   }

//   apiGetRequestWithParams(getUrl: string, getParams: HttpParams): Promise<any> {
//     const fullUrl: string = this.proxyUrl + getUrl;
//     return this.httpClient
//       .get(fullUrl, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + this.apiKey
//         },
//         params: getParams
//       })
//       .toPromise()
//       .catch(this.handleError);
//   }

//   public handleError(error: any): Promise<any> {
//     console.error('An error occurred', error);
//     return Promise.reject(error.message || error);
//   }
// }

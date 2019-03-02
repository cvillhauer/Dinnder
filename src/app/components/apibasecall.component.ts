import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'apibasecall',
  template:
  `<div>
  </div>
  `
})

export class ApiBaseCallComponent {
  private headers: Headers = new Headers();
  private apiKey: string = "iQs04ljFIuuD88ShazdNj_TP0VlrQuN2lm5iIu4hd4jjCwReExISjHVYJxv0ZmoB1-6cIUvwL25azbr9lXUD3fgzyavRzQjJ0Ai0s6Glq0b9-321-bjhhfA7acN6XHYx";
  private proxyUrl: string = "https://cors-anywhere.herokuapp.com/";

    constructor(public http: Http) {
    
     }

    apiGetRequest(getUrl: string): Promise<any> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', ('Bearer ' + this.apiKey));
        let params = new URLSearchParams();
        params.append("location", "Nashville");
        //return this.http.get(this.proxyUrl + getUrl, { headers: this.headers, search: params })
        return this.http.get(this.proxyUrl + getUrl, { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    }

    public handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

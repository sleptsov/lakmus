import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { API_END_POINT } from '../../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestService {
  constructor(private httpClient: HttpClient) { }

  fetch(path: string, search?: Object): Observable<any> {
    return this.request(path, 'GET', null, search);
  }

  post(path: string, body: Object): Observable<any> {
    return this.request(path, 'POST', body, null);
  }

  private request(path: string, method: string, body?: Object, search?: Object): Observable<any> {
    const url = API_END_POINT + path;
    const options = {
      body: JSON.stringify(body),
      params: this.serializeSearch(search)
    };
    return this.httpClient.request(method, url, options).pipe(
      catchError(this.handleError)
    );
  }

  private serializeSearch(obj: any): HttpParams {
    let params;
    if (obj) {
      params = new HttpParams();
      Object.keys(obj).forEach((key) => {
        params = params.append(key, obj[key]);
      });
      return params;
    }
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

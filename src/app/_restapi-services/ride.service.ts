import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';

@Injectable({
    providedIn: 'root'
})
export class RideService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getRide(): Observable<any> {
        return this.http.get(API_URL + 'ride/');
    }

    postRide(data): Observable<any> {
        return this.http.post(API_URL + 'rideSave', data, this.httpOptions);
    }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';

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

    getRide(status_id): Observable<any> {
        return this.http.get(API_URL + 'ride/'+status_id);
    }

    postRide(data): Observable<any> {
        return this.http.post(API_URL + 'rideSave', data, this.httpOptions);
    }

    getSingleRide(ride_id, status_id): Observable<any> {
        return this.http.get(API_URL + 'rideSingleDetails/' + ride_id + '/' + status_id);
    }

    rideStatusUpdate(data): Observable<any> {
        return this.http.post(API_URL + 'rideStatusUpdate/', data);
    }

    getOngoingRide(): Observable<any> {
        return this.http.get(API_URL + 'rideOngoingList/');
    }
}
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

    createRideId(){
        return "r_" + Math.floor(10000000000 + Math.random() * 90000000000);
    }

    getRide(status_id,company_name): Observable<any> {
        return this.http.get(API_URL + 'ride/'+ status_id + '/'+  company_name);
    }

    postRide(data): Observable<any> {
        return this.http.post(API_URL + 'rideSave', data, this.httpOptions);
    }

    getSingleRide(ride_id): Observable<any> {
        return this.http.get(API_URL + 'rideSingleDetails/' + ride_id);
    }

    rideStatusUpdate(data): Observable<any> {
        return this.http.post(API_URL + 'rideStatusUpdate/', data);
    }

    getOngoingRide(company_name): Observable<any> {
        return this.http.get(API_URL + 'rideOngoingList/' + company_name);
    }

    postAssignRide(data): Observable<any> {
        return this.http.post(API_URL + 'assignDriver', data, this.httpOptions);
    }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDriver(statusid): Observable<any> {
        return this.http.get(API_URL + 'driver/' + statusid);
    }

    getSingleDriver(driver_id): Observable<any> {
        return this.http.get(API_URL + 'singleDriver/' + driver_id);
    }

    postDriver(data): Observable<any> {
        return this.http.post(API_URL + 'driverSave', data, this.httpOptions);
    }

    putDriver(data): Observable<any> {
        return this.http.post(API_URL + 'driverUpdate', data);
    }

    postDriverDoc(data): Observable<any> {
        return this.http.post(API_URL + 'driverDocSave', data);
    }

    getDriverDoc(driver_id): Observable<any> {
        return this.http.get(API_URL + 'driverDoc/' + driver_id);
    }

    getDriverDocImage(imagePath) {
        return API_URL + 'driverDocImg?imgpath='+imagePath;
    }

    PutdriverStatus(data) {
        return this.http.post(API_URL + 'driverStatusUpdate', data);
    }

    driverApproveReject(data){
        return this.http.post(API_URL + 'driverApproveReject', data);
    }

    postDriverHistory(data){
        return this.http.post(API_URL + 'driverHistorySave', data);
    }

    getDriverHistory(driver_id): Observable<any> {
        return this.http.get(API_URL + 'driverHistory/' + driver_id);
    }
}

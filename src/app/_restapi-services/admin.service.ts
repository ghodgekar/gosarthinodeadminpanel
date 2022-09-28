import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    login(data): Observable<any> {
        return this.http.post(API_URL + 'login', data, this.httpOptions);
    }

    adminSave(data): Observable<any> {
        return this.http.post(API_URL + 'admin/signup', data, this.httpOptions);
    }

    adminLogin(data): Observable<any> {
        return this.http.post(API_URL + 'admin/signin', data, this.httpOptions);
    }

    adminList(): Observable<any> {
        return this.http.get(API_URL + 'admin/list', this.httpOptions);
    }

}

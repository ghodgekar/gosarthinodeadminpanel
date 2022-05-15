import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getCustomer(): Observable<any> {
        return this.http.get(API_URL + 'customer');
    }

    postCustomer(data): Observable<any> {
        return this.http.post(API_URL + 'customerSave', data, this.httpOptions);
    }

    putCustomer(data): Observable<any> {
        return this.http.post(API_URL + 'customerUpdate', data);
    }

    getCustomerByPhone(phone):Observable<any> {
        return this.http.get(API_URL + 'customerByPhone/' + phone);
    }

}

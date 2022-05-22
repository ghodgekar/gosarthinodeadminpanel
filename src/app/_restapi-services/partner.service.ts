import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = 'https://nodeadminpaneldb.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    createPartnerId(){
        return "p_" + Math.floor(10000000000 + Math.random() * 90000000000);
    }

    getPartner(): Observable<any> {
        return this.http.get(API_URL + 'partner');
    }

    postPartner(data): Observable<any> {
        return this.http.post(API_URL + 'partnerSave', data, this.httpOptions);
    }

    putPartner(data): Observable<any> {
        return this.http.post(API_URL + 'partnerUpdate', data);
    }

    getPartnerByPhone(phone):Observable<any> {
        return this.http.get(API_URL + 'partnerByPhone/' + phone);
    }

    partnerLogin(data): Observable<any> {
        return this.http.post(API_URL + 'partnerLogin', data, this.httpOptions);
    }

}

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

    getPartner(statusid): Observable<any> {
        return this.http.get(API_URL + 'partner/' + statusid);
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


    getSinglePartner(partner_id): Observable<any> {
        return this.http.get(API_URL + 'singlePartner/' + partner_id);
    }

    postPartnerDoc(data): Observable<any> {
        return this.http.post(API_URL + 'partnerDocSave', data);
    }

    getPartnerDoc(partner_id): Observable<any> {
        return this.http.get(API_URL + 'partnerDoc/' + partner_id);
    }

    getPartnerDocImage(imagePath) {
        return API_URL + 'partnerDocImg?imgpath='+imagePath;
    }

    PutPartnerStatus(data) {
        return this.http.post(API_URL + 'partnerStatusUpdate', data);
    }

    partnerApproveReject(data){
        return this.http.post(API_URL + 'partnerApproveReject', data);
    }

    postPartnerHistory(data){
        return this.http.post(API_URL + 'partnerHistorySave', data);
    }

    getPartnerHistory(partner_id): Observable<any> {
        return this.http.get(API_URL + 'partnerHistory/' + partner_id);
    }

}

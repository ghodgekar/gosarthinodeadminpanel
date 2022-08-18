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

    getRideByPartner(partner_id): Observable<any> {
        return this.http.get(API_URL + 'rideByPartner/'+ partner_id);
    }

    getRideByDriver(driver_id): Observable<any> {
        return this.http.get(API_URL + 'rideByDriver/'+ driver_id);
    }

    getVehicleType(): Observable<any> {
        return this.http.get(API_URL + 'carcategory');
    }

    getCarModel(category): Observable<any> {
        return this.http.get(API_URL + 'carmodel/' + category);
    }

    uploadRideImg(data):Observable<any> {
        return this.http.post(API_URL + 'uploadRideCarImg', data);
    }

    getRideCarImgList(ride_id, ride_type): Observable<any> {
        return this.http.get(API_URL + 'rideCarImgList/' + ride_id + '/' + ride_type);
    }

    getSingleRideCarImg(imagePath) {
        return API_URL + 'rideCarImg?imgpath='+imagePath;
    }

    postReassignData(data):Observable<any> {
        return this.http.post(API_URL + 'rideReassignDataSave', data);
    }

    getReassignData(ride_id, exist_parking_no): Observable<any> {
        return this.http.get(API_URL + 'rideReassignDataList/' + ride_id + '/' + exist_parking_no);
    }

    postOTP(data){
        return this.http.post('https://api.textlocal.in/send/', data);
    }

    postB2CDriverFare(data){
        return this.http.post(API_URL + 'b2cTrailerFare', data);
    }
}
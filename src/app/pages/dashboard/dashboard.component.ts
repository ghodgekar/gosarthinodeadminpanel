import { CustomerService } from '@/_restapi-services/customer.service';
import { PartnerService } from '@/_restapi-services/partner.service';
import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    partnerCount: any;
    customerCount: any;
    rideOngoingCount: any;
    rideCompletedCount: any;
    constructor(public partnerapi:PartnerService, public appservice:AppService, public customerapi:CustomerService, public rideapi:RideService){

    }
    ngOnInit(): void {
        this.getPartnerCount();
        this.getCustomerCount();
        this.getOngoingRideCount();
        this.getCompletedCount();
        // throw new Error('Method not implemented.');
    }

    getPartnerCount(){
        this.partnerapi.getPartner(3).subscribe(response => {
            this.partnerCount = response.data.length;
        })
    }

    getCustomerCount(){
        if(this.appservice.role == 'partner'){
            this.customerapi.getCustomer(this.appservice.user.company_name).subscribe(response => {
            this.customerCount = response.data.length;
            })
        }else{
            this.customerapi.getCustomer('all').subscribe(response => {
            this.customerCount = response.data.length;
            })
        }
    }

    getOngoingRideCount(){
      let company_name;
      if(this.appservice.role == 'partner'){
        company_name = this.appservice.user.company_name;
      }else{
        company_name = 'all';
      }
      this.rideapi.getOngoingRide(company_name).subscribe(response => {
        this.rideOngoingCount = response.data.length;
      })
    }

    getCompletedCount(){
      let company_name;
      if(this.appservice.role == 'partner'){
        company_name = this.appservice.user.company_name;
      }else{
        company_name = 'all';
      }
      this.rideapi.getRide(7,company_name).subscribe(response => {
        this.rideCompletedCount = response.data.length;
      })
    }

}

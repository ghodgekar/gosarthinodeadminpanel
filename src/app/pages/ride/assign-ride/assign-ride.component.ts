import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-ride',
  templateUrl: './assign-ride.component.html',
  styleUrls: ['./assign-ride.component.scss']
})
export class AssignRideComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  rideData:any=[];
  
  constructor(private rideapi:RideService, private router:Router, public appservice:AppService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getRide();
  }

  getRide(){
    let company_name;
    if(this.appservice.role == 'partner'){
      company_name = this.appservice.user.company_name;
    }else{
      company_name = 'all';
    }
    this.rideapi.getRide(1, company_name).subscribe(response => {
      this.rideData = response.data;
    })
  }

  openRideDetails(ride_id,status_id){
    this.router.navigate(['/ride-details',ride_id,status_id]);
  }
}

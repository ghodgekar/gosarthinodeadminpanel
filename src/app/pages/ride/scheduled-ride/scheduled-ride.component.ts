import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduled-ride',
  templateUrl: './scheduled-ride.component.html',
  styleUrls: ['./scheduled-ride.component.scss']
})
export class ScheduledRideComponent implements OnInit {
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
    this.rideapi.getRide(2, company_name).subscribe(response => {
      this.rideData = response.data;
    })
  }

  openRideDetails(ride_id,status_id){
    this.router.navigate(['/ride-details',ride_id,status_id]);
  }

}

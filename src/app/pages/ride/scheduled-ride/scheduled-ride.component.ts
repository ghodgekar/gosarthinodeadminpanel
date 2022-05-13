import { RideService } from '@/_restapi-services/ride.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduled-ride',
  templateUrl: './scheduled-ride.component.html',
  styleUrls: ['./scheduled-ride.component.scss']
})
export class ScheduledRideComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  rideData:any=[];
  constructor(private rideapi:RideService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getRide();
  }

  getRide(){
    this.rideapi.getRide().subscribe(response => {
      this.rideData = response.data;
    })
  }

}

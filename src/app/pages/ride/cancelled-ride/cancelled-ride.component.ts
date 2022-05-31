import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { ExclService } from '@/_services/excl.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelled-ride',
  templateUrl: './cancelled-ride.component.html',
  styleUrls: ['./cancelled-ride.component.scss']
})
export class CancelledRideComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  public dtOptions: DataTables.Settings = {};
  rideData:any=[];
  
  constructor(private rideapi:RideService, private router:Router, public appservice:AppService, public exclservice:ExclService) { }

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
    this.rideapi.getRide(8, company_name).subscribe(response => {
      this.rideData = response.data;
    })
  }

  openRideDetails(ride_id,status_id){
    this.router.navigate(['/ride-details',ride_id,status_id]);
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'cancelled rides');
  }

}

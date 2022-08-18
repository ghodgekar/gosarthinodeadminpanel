import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { ExclService } from '@/_services/excl.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trailer-request-ride',
  templateUrl: './trailer-request-ride.component.html',
  styleUrls: ['./trailer-request-ride.component.scss']
})
export class TrailerRequestRideComponent implements OnInit {


  @ViewChild('table') table: ElementRef;
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  rideData:any=[];
  
  constructor(private rideapi:RideService, private router:Router, public appservice:AppService, public exclservice:ExclService) { }

  ngOnInit(): void {
    this.getRide();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
  }

  getRide(){
    let company_name;
    if(this.appservice.role == 'partner'){
      company_name = this.appservice.user.company_name;
    }else{
      company_name = 'all';
    }
    this.rideapi.getRide(9, company_name).subscribe(response => {
      this.rideData = response.data;
      this.dtTrigger.next();
    })
  }

  openRideDetails(ride_id,status_id){
    this.router.navigate(['/ride-details',ride_id,status_id]);
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'assigned rides');
  }

}

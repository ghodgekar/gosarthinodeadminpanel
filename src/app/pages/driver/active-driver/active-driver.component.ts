import { DriverService } from '@/_restapi-services/driver.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-driver',
  templateUrl: './active-driver.component.html',
  styleUrls: ['./active-driver.component.scss']
})
export class ActiveDriverComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  driverData: any;

  constructor(private api:DriverService, private router:Router) { }

  ngOnInit(): void {
    this.getDriver(3);
  }  
  
  getDriver(statusid){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getDriver(statusid).subscribe(response => {
      this.driverData = response.data;
    })
  }

  openDriverDetailsPage(driver_id){
    this.router.navigate(['/driver-details',driver_id]);
  }

}

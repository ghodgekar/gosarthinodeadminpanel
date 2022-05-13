import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancelled-ride',
  templateUrl: './cancelled-ride.component.html',
  styleUrls: ['./cancelled-ride.component.scss']
})
export class CancelledRideComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

}

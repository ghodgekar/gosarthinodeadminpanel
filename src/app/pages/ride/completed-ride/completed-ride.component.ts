import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-ride',
  templateUrl: './completed-ride.component.html',
  styleUrls: ['./completed-ride.component.scss']
})
export class CompletedRideComponent implements OnInit {

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

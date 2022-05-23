import { DriverService } from '@/_restapi-services/driver.service';
import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.scss']
})
export class RideDetailsComponent implements OnInit {
  ride_id: string;
  status_id: string;
  cancelledstatus:string='8';
  completedstatus:string='7';
  rideData:any=[];
  cancelRideForm: FormGroup;
  completeRideForm: FormGroup;
  driverData: any =[];
  driver_id:string;

  constructor(private Actrouter:ActivatedRoute, private rideapi:RideService, private modalService: ModalService, private router:Router, private driverApi:DriverService, public appservice:AppService) { }

  ngOnInit(): void {
    this.Actrouter.params.subscribe(paramsId => {
      this.ride_id = paramsId.ride_id;
      this.status_id = paramsId.status_id;
    });
    this.cancelRideForm = new FormGroup({
      ride_id: new FormControl(),
      cancelled_reason: new FormControl(),
      status: new FormControl()
    })
    this.completeRideForm = new FormGroup({
      ride_id: new FormControl(),
      feedback: new FormControl(),
      status: new FormControl()
    })
    this.getSingleRide();
    this.getDriver();
  }

  getDriver(){
    this.driverApi.getDriver(3).subscribe(response => {
      this.driverData = response.data;
    })
  }

  getSingleRide(){
    this.rideapi.getSingleRide(this.ride_id, this.status_id).subscribe(response => {
      this.rideData.push(response.data);
    })
  }

  startride(){
    this.rideapi.rideStatusUpdate({ride_id: this.ride_id, status: 3}).subscribe(response => {
      this.router.navigate(['/ongoing-ride']);
    })
  }

  reachedpickup(){
    this.rideapi.rideStatusUpdate({ride_id: this.ride_id, status: 4}).subscribe(response => {
      this.router.navigate(['/ongoing-ride']);
    })
  }

  reacheddrop(){
    this.rideapi.rideStatusUpdate({ride_id: this.ride_id, status: 5}).subscribe(response => {
      this.router.navigate(['/ongoing-ride']);
    })
  }

  paymentdone(){
    this.rideapi.rideStatusUpdate({ride_id: this.ride_id, status: 6}).subscribe(response => {
      this.router.navigate(['/ongoing-ride']);
    })
  }

  completedride(content){
    this.modalService.open(content)
  }

  completeRideSubmit(){
    this.rideapi.rideStatusUpdate(this.completeRideForm.value).subscribe(response => {
      this.modalService.dismissall();
      this.completeRideForm.reset();
      this.router.navigate(['/completed-ride']);
    })
  }

  cancelledride(content){
    this.modalService.open(content)
  }

  cancelRideSubmit(){
    this.rideapi.rideStatusUpdate(this.cancelRideForm.value).subscribe(response => {
      this.modalService.dismissall();
      this.cancelRideForm.reset();
      this.router.navigate(['/cancelled-ride']);
    })
  }

  assignDriver(){
    this.rideapi.postAssignRide({driver_id:this.driver_id, ride_id:this.ride_id,status:2}).subscribe(response => {
      this.router.navigate(['/scheduled-ride']);
    })
  }
}

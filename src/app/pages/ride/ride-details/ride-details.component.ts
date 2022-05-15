import { RideService } from '@/_restapi-services/ride.service';
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

  constructor(private Actrouter:ActivatedRoute, private rideapi:RideService, private modalService: ModalService, private router:Router) { }

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
}

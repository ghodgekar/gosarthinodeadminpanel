import { CustomerService } from '@/_restapi-services/customer.service';
import { DriverService } from '@/_restapi-services/driver.service';
import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { ModalService } from '@/_services/modal.service';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
declare var google;

@Component({
  selector: 'app-manual-ride',
  templateUrl: './manual-ride.component.html',
  styleUrls: ['./manual-ride.component.scss']
})
export class ManualRideComponent implements OnInit {
  @ViewChild('searchpickup')
  public searchPickupElementRef: ElementRef;
  @ViewChild('searchdrop')
  public searchDropElementRef: ElementRef;

  rideid:any;

  username:String;
  userid:String;

  rideForm: FormGroup;
  lat: Number;
  lng: Number;

  pickuplat:Number;
  pickuplng:Number;
  pickupaddress: string;
  droplat:Number;
  droplng:Number;
  dropaddress: string;

  zoom: Number = 14;
  markers = [];
  filteredMarkers = [];
  dir = undefined;
  private geoCoder;

  userData:any=[];
  driverData: any =[];
  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private modalService: ModalService, private customerApi:CustomerService, private rideapi:RideService, private driverApi:DriverService, public appservice:AppService ) { }

  ngOnInit(): void {
    this.getDriver();
    this.rideForm = new FormGroup({
      ride_id:new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
      city: new FormControl(),
      ostype: new FormControl(),
      fueltype: new FormControl(),
      triptype: new FormControl(),
      vehicle_type: new FormControl(),
      vehicle_transmission:new FormControl(),
      car_no: new FormControl(),
      pickupaddress: new FormControl(),
      dropaddress: new FormControl(),
      drivernote:new FormControl(),
      user_id:new FormControl(),
      driver_id:new FormControl(),
      pickuplat:new FormControl(),
      pickuplng:new FormControl(),
      droplat:new FormControl(),
      droplng:new FormControl(),
      requesttime:new FormControl(),
      status:new FormControl(1),
      partner_id:new FormControl(null),
      company_name: new FormControl(null),
    })

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
        let autocompletePickup = new google.maps.places.Autocomplete(this.searchPickupElementRef.nativeElement);
        autocompletePickup.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompletePickup.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.pickuplat = place.geometry.location.lat();
            this.pickuplng = place.geometry.location.lng();
            this.pickupaddress = place.formatted_address;
            this.zoom = 12;
          });
        });
        let autocompleteDrop = new google.maps.places.Autocomplete(this.searchDropElementRef.nativeElement);
        autocompleteDrop.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompleteDrop.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.droplat = place.geometry.location.lat();
            this.droplng = place.geometry.location.lng();
            this.dropaddress = place.formatted_address;
            this.zoom = 12;
          });
          this.getDirection();
        });
      });
  }

  getDirection() {
    this.dir = {
      origin: { lat: this.pickuplat, lng: this.pickuplng },
      destination: { lat: this.droplat, lng: this.droplng }
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }
 
  markerDragEnd($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  openFareModal(content){
    this.modalService.open(content)
  }

  getDriver(){
    this.driverApi.getDriver(3).subscribe(response => {
      this.driverData = response.data;
    })
  }

  getUser(e){
    this.customerApi.getCustomerByPhone(e.target.value).subscribe(response => {
      this.userData = response.data[0];
      this.username = response.data[0].name;
      this.userid = response.data[0].user_id;
    })
  }

  onSubmit() {
    if(this.rideForm.valid){
      if(this.appservice.role == 'partner'){
        this.rideForm.value.partner_id = this.appservice.user.partner_id;
        this.rideForm.value.company_name = this.appservice.user.company_name;
      }
      this.rideForm.value.ride_id =  this.rideapi.createRideId();
      this.rideapi.postRide(this.rideForm.value).subscribe(response => {
        this.rideForm.reset();
      })
    }else{
      alert("please enter all details")
    }
  }

}

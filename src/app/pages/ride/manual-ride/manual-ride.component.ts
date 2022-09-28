import firebase from 'firebase/compat/app';
import { CustomerService } from '@/_restapi-services/customer.service';
import { DriverService } from '@/_restapi-services/driver.service';
import { RideService } from '@/_restapi-services/ride.service';
import { AppService } from '@/_services/app.service';
import { ExclService } from '@/_services/excl.service';
import { ModalService } from '@/_services/modal.service';
import { OtpService } from '@/_services/otp.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { response } from 'express';
declare let google;

@Component({
  selector: 'app-manual-ride',
  templateUrl: './manual-ride.component.html',
  styleUrls: ['./manual-ride.component.scss']
})
export class ManualRideComponent implements OnInit {
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  @ViewChild('table') table: ElementRef;
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

  zoom: Number = 1;
  markers = [];
  filteredMarkers = [];
  dir = undefined;
  private geoCoder;

  userData:any=[];
  driverData: any =[];
  vehicleType:any =[];
  CarModel:any =[];
  OTPRand: number;
  OTPVerify: number;
  isOTPVerified:boolean;
  hideOtpBtn: boolean;

  bookingtype:string;

  vehicle_type:string;
  transmission:string;
  distancekm:any;
  b2cDriverFare:any=[];


  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private modalService: ModalService, private customerApi:CustomerService, private rideapi:RideService, private driverApi:DriverService, public appservice:AppService, public exclservice:ExclService, private otpService:OtpService, private tosterService:ToastrNotifyService ) {
    }

  ngOnInit(){
    this.getDriver();
    this.getVehicleType();
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
      bookingtype: new FormControl(null),
      appointment_no:new FormControl(),
      car_model:new FormControl()
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
            this.zoom = 3;
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
            this.zoom = 3;
          });
          this.getDirection();
        });
      });
  }

  getVehicleType(){
    this.rideapi.getVehicleType().subscribe(response => {
      this.vehicleType = response.data;
    })
  }

  getCarModel(e){
    this.rideapi.getCarModel(e.target.value).subscribe(response => {
      this.CarModel = response.data;
    })
  }

  getDirection() {
    this.dir = {
      origin: { lat: this.pickuplat, lng: this.pickuplng },
      destination: { lat: this.droplat, lng: this.droplng }
    }
    this.calcCrow(this.pickuplat,this.pickuplng,this.droplat,this.droplng);
  }

  calcCrow(lat1, lon1, lat2, lon2) 
    {
      var p1 = new google.maps.LatLng(lat1, lon1);
      var p2 = new google.maps.LatLng(lat2, lon2);
      this.distancekm = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
      console.log(this.distancekm + 200)
      // let R = 6371; // km
      // let dLat = this.toRad(lat2-lat1);
      // let dLon = this.toRad(lon2-lon1);
      // lat1 = this.toRad(lat1);
      // lat2 = this.toRad(lat2);

      // let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      //   Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      // let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      // let d = R * c;
      // this.distancekm = Math.round(d);
      // return d;
    }

    toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    calculateB2CDriver(){
      this.rideapi.postB2CDriverFare({car_type:this.vehicle_type,transmission:this.transmission,fuel_type:1,distancekm: parseInt(this.distancekm) + 100}).subscribe(res => {
        this.b2cDriverFare = res;
      })
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
      console.log(results)
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
    this.customerApi.getCustomerByPhone(e.target.value,this.appservice.user.partner_id).subscribe(response => {
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
      if(this.bookingtype == 'Trailer'  && this.appservice.user.partner_type == 'B2C'){
        this.rideForm.value.status = 9;
      }
      this.rideForm.value.ride_id =  this.rideapi.createRideId();
      this.rideapi.postRide(this.rideForm.value).subscribe(response => {
        this.rideForm.reset();
      })
    }else{
      alert("please enter all details")
    }
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'cancelled rides');
  }

  // recaptchaVerify(){
  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
  //     size: 'invisible',
  //     callback: (response) => {
  //     },
  //     'expired-callback': () => {
  //     }
  //   });
  // }

  sendOTP(content){
    let phoneno = this.rideForm.value['phone'];
    if(!phoneno){
      this.tosterService.showError("Please enter valid phone no",'');
    }else if(phoneno) {
      this.OTPRand = Math.floor(100000 + Math.random() * 900000);
      let otpMessage = 'Your OTP Is ' + this.OTPRand; 
      let otpApi = 'NTQ1MTc0NDY2ZTQ0NTE1NzQzNDczMDU5NDE1OTU3NmQ=';
      // this.rideapi.postOTP({'apikey':otpApi,'numbers':phoneno,'sender':'TXTLCL','message':otpMessage}).subscribe(response => {
      //   console.log(response)
      //   this.modalService.open(content);
      // })
        this.modalService.open(content);
    }else{
      this.tosterService.showError("Please enter valid phone no",'');
    }
  }

  verifyOTP(){
    if(this.OTPRand == this.OTPVerify){
      this.isOTPVerified =true;
      this.hideOtpBtn = true;
      this.tosterService.showSuccess("OTP Verify Successfully",'');
      this.modalService.dismissall();
    }else{
      this.tosterService.showError("Invalid OTP",'');
    }
  }

}

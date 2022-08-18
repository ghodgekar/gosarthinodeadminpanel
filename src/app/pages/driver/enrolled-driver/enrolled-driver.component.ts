import { DriverService } from '@/_restapi-services/driver.service';
import { AlertService } from '@/_services/alert.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-driver',
  templateUrl: './enrolled-driver.component.html',
  styleUrls: ['./enrolled-driver.component.scss']
})
export class EnrolledDriverComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  public driverForm: FormGroup;
  public driverData:any=[];
  constructor(private router: Router, private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, private api:DriverService) { }

  ngOnInit(){
    this.getDriver(1);
    this.driverForm = new FormGroup({
      driver_id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      alt_phone: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      country: new FormControl('India'),
      state: new FormControl(),
      city: new FormControl(),
      address: new FormControl(),
      device_type: new FormControl(),
      pincode: new FormControl(),
      bank_name: new FormControl(),
      acc_holder_name: new FormControl(),
      acc_no: new FormControl(),
      ifsc_code: new FormControl(),
      micr_code: new FormControl(),
      vehicle_type: new FormControl()
    })
  }

  getDriver(statusid){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.api.getDriver(statusid).subscribe(response => {
      this.driverData = response.data;
    })
  }

  openAddDriverModal(content){
    this.modalService.open(content)
  }

  onSubmit() {
    this.driverForm.value.driver_id = this.api.createDriverId();
    this.api.postDriver(this.driverForm.value).subscribe(response => {
      if(response.message){
        this.driverForm.reset();
        this.getDriver(1);
        this.modalService.dismissall();
      }
    })
  }

  openUploadDocPage(driver_id){
    this.router.navigate(['/upload-doc',driver_id]);
  }

  openApproveDriverPage(driver_id){
    this.router.navigate(['/approve-doc',driver_id]);
  }

}
import { AlertService } from '@/_services/alert.service';
import { CustomerService } from '@/_restapi-services/customer.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-active-customer',
  templateUrl: './active-customer.component.html',
  styleUrls: ['./active-customer.component.scss']
})
export class ActiveCustomerComponent implements OnInit {
  public customerForm: FormGroup;
  public customerData:any=[];
  public dtOptions: DataTables.Settings = {};
  constructor(private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, public api:CustomerService) { }

  ngOnInit(){
    this.getCustomer();
    this.customerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      gender: new FormControl(),
      state: new FormControl(),
      city: new FormControl(),
      pincode: new FormControl(),
      address: new FormControl()
    })
  }

  getCustomer(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getCustomer().subscribe(response => {
      this.customerData = response.data;
    })
  }

  openAddCustomerModal(content){
    this.modalService.open(content)
  }

  onSubmit() {
    if(this.customerForm.valid){
      this.api.postCustomer(this.customerForm.value).subscribe(response => {
        if(response.message){
          this.customerForm.reset();
          this.getCustomer();
          this.modalService.dismissall();
        }
      })
    }
  }
}

import { PartnerService } from '@/_restapi-services/partner.service';
import { AlertService } from '@/_services/alert.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-active-partner',
  templateUrl: './active-partner.component.html',
  styleUrls: ['./active-partner.component.scss']
})
export class ActivePartnerComponent implements OnInit {

  public partnerForm: FormGroup;
  public partnerData:any=[];
  public dtOptions: DataTables.Settings = {};
  constructor(private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, public api:PartnerService) { }

  ngOnInit(){
    this.getPartner();
    this.partnerForm = new FormGroup({
      partner_id: new FormControl(),
      company_name: new FormControl(),
      company_no: new FormControl(),
      email: new FormControl(),
      gst_no: new FormControl(),
      phone: new FormControl(),
      state: new FormControl(),
      city: new FormControl(),
      pincode: new FormControl(),
      address: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    })
  }

  getPartner(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getPartner().subscribe(response => {
      this.partnerData = response.data;
    })
  }

  openAddPartnerModal(content){
    this.modalService.open(content)
  }

  onSubmit() {
    if(this.partnerForm.valid){
      this.partnerForm.value.partner_id = this.api.createPartnerId();
      this.api.postPartner(this.partnerForm.value).subscribe(response => {
        if(response.message){
          this.partnerForm.reset();
          this.getPartner();
          this.modalService.dismissall();
        }
      })
    }
  }
}

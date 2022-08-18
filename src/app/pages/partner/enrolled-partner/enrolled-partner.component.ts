import { DriverService } from '@/_restapi-services/driver.service';
import { PartnerService } from '@/_restapi-services/partner.service';
import { AlertService } from '@/_services/alert.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-partner',
  templateUrl: './enrolled-partner.component.html',
  styleUrls: ['./enrolled-partner.component.scss']
})
export class EnrolledPartnerComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  public partnerForm: FormGroup;
  public partnerData:any=[];
  constructor(private router: Router, private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, private api:PartnerService) { }

  ngOnInit(){
    this.getPartner(1);
    this.partnerForm = new FormGroup({
      partner_id: new FormControl(),
      partner_type: new FormControl(),
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
      password: new FormControl(),
      bank_name: new FormControl(),
      acc_holder_name: new FormControl(),
      acc_no: new FormControl(),
      ifsc_code: new FormControl(),
      micr_code: new FormControl(),
    })
  }

  getPartner(statusid){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.api.getPartner(statusid).subscribe(response => {
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
          this.getPartner(1);
          this.modalService.dismissall();
        }
      })
    }
  }

  openUploadDocPage(partner_id){
    this.router.navigate(['/upload-doc-partner',partner_id]);
  }

  openApprovePartnerPage(partner_id){
    this.router.navigate(['/approve-doc-partner',partner_id]);
  }
}

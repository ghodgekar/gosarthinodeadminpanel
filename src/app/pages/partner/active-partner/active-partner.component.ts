import { PartnerService } from '@/_restapi-services/partner.service';
import { AlertService } from '@/_services/alert.service';
import { ExclService } from '@/_services/excl.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-active-partner',
  templateUrl: './active-partner.component.html',
  styleUrls: ['./active-partner.component.scss']
})
export class ActivePartnerComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  public partnerForm: FormGroup;
  public partnerData:any=[];
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false
  
  constructor(private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, public api:PartnerService, public exclservice:ExclService, private router:Router) { }

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
      processing: true,
      responsive: true,
    };
    this.api.getPartner(3).subscribe(response => {
      this.partnerData = response.data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    })
  }

  openAddPartnerModal(content){
    this.modalService.open(content)
  }

  openPartnerDetailsPage(partner_id){
    this.router.navigate(['/details-partner',partner_id]);
  }

  onSubmit() {
    // if(this.partnerForm.valid){
      this.partnerForm.value.partner_id = this.api.createPartnerId();
      this.api.postPartner(this.partnerForm.value).subscribe(response => {
        if(response.message){
          this.partnerForm.reset();
          this.getPartner();
          this.modalService.dismissall();
        }
      })
    // }
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'active rides');
  }
}

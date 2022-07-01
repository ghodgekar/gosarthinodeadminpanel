import { PartnerService } from '@/_restapi-services/partner.service';
import { RideService } from '@/_restapi-services/ride.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-partner',
  templateUrl: './details-partner.component.html',
  styleUrls: ['./details-partner.component.scss']
})
export class DetailsPartnerComponent implements OnInit {

  partnerDocumentForm:FormGroup;
  partnerDeactiveForm: FormGroup;
  partnerActiveForm: FormGroup;
  partner_id: string;
  partnerauto_id:string;
  document_name:string;
  fileInputLabel: string;
  partnerDocData: any=[];
  imageSrc: any;
  partnerData:any=[];
  rideData:any=[];
  partneruploadedDocCount:number;
  partnerDeactiveStatus:string='4';
  partnerActiveStatus:String='3';
  partnerDeactiveAction:string='Deactivate Partner';
  partnerActiveAction:string='Activate Partner';
  partnerHistoryData:any=[];

  partnerDocumentList:any=[
    { document_name: "pancard", doc_name:"Pancard", image_name:'pancard.png'},
    { document_name: "cancel_cheque", doc_name:"Cancle Cheque", image_name:'bank.png'}
  ]

  rideStatus:any=[
    { '2': "Ride Assign To Driver", '3':"Ride Started", '4':'Reached Pickup Location', '5':'Reached Drop Location', '6':'Payment Done', '7':'Ride Completed', '8':'Ride Canclled'},
  ]

  constructor(private modalService: ModalService, private Actrouter:ActivatedRoute, private api:PartnerService, private rideApi:RideService, private router:Router) { 
    this.Actrouter.params.subscribe(paramsId => {
      this.partner_id = paramsId.partner_id;
    });
  }

  ngOnInit(): void {
    this.getPartnerDoc(this.partner_id);
    this.getPartnerDetails();
    this.getPartnerHistory();
    this.getRideByPartner(this.partner_id)
    this.partnerDocumentForm = new FormGroup({
      document_img: new FormControl(),
      document_no: new FormControl(),
      partner_id: new FormControl(),
      document_name: new FormControl()
    })

    this.partnerDeactiveForm = new FormGroup({
      reason: new FormControl(),
      remark: new FormControl(),
      partner_id: new FormControl(),
      partnerhistorystatus: new FormControl(),
      action: new FormControl()
    })

    this.partnerActiveForm = new FormGroup({
      reason: new FormControl(),
      remark: new FormControl(),
      partner_id: new FormControl(),
      partnerhistorystatus: new FormControl(),
      action: new FormControl()
    })
  }

  async getPartnerDetails(){
    await this.api.getSinglePartner(this.partner_id).subscribe(response => {
      this.partnerData = response.data;
      this.partnerauto_id = this.partnerData[0]._id;
    })
  }

  async getPartnerDoc(partner_id){
    await this.api.getPartnerDoc(partner_id).subscribe(response => {
      this.partnerDocData = response.data;
      this.partneruploadedDocCount = this.partnerDocData.length;
    })
  }
  
  openuploadDocModal(content,document_name,document_img){
    this.document_name = document_name;
    this.modalService.open(content)
    this.getPartnerDocImage(document_name,document_img);
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.partnerDocumentForm.get('document_img').setValue(file);
  }

  getPartnerDocImage(document_name,document_img){
    this.imageSrc = this.api.getPartnerDocImage('uploads/partner/'+document_name+'/'+document_img);
  }

  onSubmit(){
    if(this.partnerDocumentForm.valid){
      const formData = new FormData();
      formData.append('document_img', this.partnerDocumentForm.get('document_img').value);
      formData.append('document_no', this.partnerDocumentForm.get('document_no').value);
      formData.append('partner_id', this.partnerDocumentForm.get('partner_id').value);
      formData.append('document_name', this.partnerDocumentForm.get('document_name').value);
      this.api.postPartnerDoc(formData).subscribe((response: any) => {
        this.modalService.dismissall();
        this.getPartnerDoc(this.partner_id);
      })
    }
  }

  openModalContent(content){
    this.modalService.open(content);
  }

  partnerDeactiveSubmit(){
    if(this.partnerDeactiveForm.valid){
      this.api.postPartnerHistory(this.partnerDeactiveForm.value).subscribe(response => {
        this.modalService.dismissall();
        this.partnerDeactiveForm.reset();
      })
    }
  }

  partnerActiveSubmit(){
    if(this.partnerActiveForm.valid){
      this.api.postPartnerHistory(this.partnerActiveForm.value).subscribe(response => {
        this.modalService.dismissall();
        this.partnerActiveForm.reset();
      })
    }
  }

  getPartnerHistory(){
    this.api.getPartnerHistory(this.partner_id).subscribe(response => {
      this.partnerHistoryData = response.data;
    })
  }

  getRideByPartner(partner_id){
    this.rideApi.getRideByPartner(partner_id).subscribe(response => {
      this.rideData = response.data;
    })
  }

  openpageRide(url, id){
    this.router.navigate([url,id,1]);
    this.modalService.dismissall();
  }

  openpageDriver(url, id){
    this.router.navigate([url,id]);
    this.modalService.dismissall();
  }

}

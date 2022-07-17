import { PartnerService } from '@/_restapi-services/partner.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-doc-partner',
  templateUrl: './upload-doc-partner.component.html',
  styleUrls: ['./upload-doc-partner.component.scss']
})
export class UploadDocPartnerComponent implements OnInit {
  partnerdocStatus:number;
  partnerDocumentForm:FormGroup
  partner_id: string;
  partnerauto_id:string;
  document_name:string;
  fileInputLabel: string;
  public partnerDocData: any=[];
  imageSrc: any;
  partnerData:any=[];
  partneruploadedDocCount:number;

  partnerDocumentList:any=[
    { document_name: "pancard", doc_name:"Pancard", image_name:'pancard.png'},
    { document_name: "cancel_cheque", doc_name:"Cancle Cheque", image_name:'bank.png'},
    { document_name: "gst", doc_name:"GST Certificate", image_name:'pancard.png'}
  ]

  constructor(private modalService: ModalService, private Actrouter:ActivatedRoute, private api:PartnerService) { 
    this.Actrouter.params.subscribe(paramsId => {
      this.partner_id = paramsId.partner_id;
    });
  }

  ngOnInit(): void {
    this.getPartnerDoc(this.partner_id);
    this.getPartnerDetails();
    this.partnerDocumentForm = new FormGroup({
      document_img: new FormControl(),
      document_no: new FormControl(),
      partner_id: new FormControl(),
      document_name: new FormControl()
    })
  }

  async getPartnerDetails(){
    await this.api.getSinglePartner(this.partner_id).subscribe(response => {
      this.partnerData = response.data;
      this.partnerauto_id = this.partnerData[0]._id;
      if(this.partnerData[0].reject_reason != ''){
        this.partnerdocStatus = 1;
      }if(this.partnerData[0].reject_reason == null){
        this.partnerdocStatus = 0;
      }
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

  PutpartnerStatus(){
    this.api.PutPartnerStatus({ partner_id:this.partner_id, status:2, reject_reason:'' }).subscribe(response => {
      this.getPartnerDetails();
      this.partnerdocStatus = 2;
    })
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
}

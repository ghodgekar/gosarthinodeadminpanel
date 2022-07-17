import { PartnerService } from '@/_restapi-services/partner.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approve-doc-partner',
  templateUrl: './approve-doc-partner.component.html',
  styleUrls: ['./approve-doc-partner.component.scss']
})
export class ApproveDocPartnerComponent implements OnInit {
  approveBtnDisable:boolean=true;
  partnerApproveStatus:Number=0;
  partner_id: string;
  document_name:string;
  fileInputLabel: string;
  reject_reason:string;
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
  }

  async getPartnerDetails(){
    await this.api.getSinglePartner(this.partner_id).subscribe(response => {
      this.partnerData = response.data;
    })
  }

  async getPartnerDoc(partner_id){
    await this.api.getPartnerDoc(partner_id).subscribe(response => {
      this.partnerDocData = response.data;
      this.partneruploadedDocCount = this.partnerDocData.length;
    })
  }

  getPartnerDocImage(document_name,document_img){
    this.imageSrc = this.api.getPartnerDocImage('uploads/partner/'+document_name+'/'+document_img);
  }
  
  openuploadDocModal(content,document_name,document_img){
    this.document_name = document_name;
    this.modalService.open(content)
    this.getPartnerDocImage(document_name,document_img);
  }

  openApproveModal(content){
    this.modalService.open(content)
  }

  onChange(e){
    if(e === ''){
      this.approveBtnDisable = true;
    }else{
      this.approveBtnDisable = false;
    }
  }

  approveRejectDoc(status){
    this.api.partnerApproveReject({partner_id:this.partner_id, status:status, reject_reason:this.reject_reason}).subscribe(response => {
      if(status === 1){
        this.partnerApproveStatus == 1;
      }
      if(status === 3){
        this.partnerApproveStatus == 2;
      }
      this.modalService.dismissall();
      this.getPartnerDetails();
    })
  }
}

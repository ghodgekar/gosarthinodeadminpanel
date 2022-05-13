import { DriverService } from '@/_restapi-services/driver.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approve-doc',
  templateUrl: './approve-doc.component.html',
  styleUrls: ['./approve-doc.component.scss']
})
export class ApproveDocComponent implements OnInit {
  approveBtnDisable:boolean=true;
  driverApproveStatus:Number=0;
  driver_id: string;
  document_name:string;
  fileInputLabel: string;
  reject_reason:string;
  public driverDocData: any=[];
  imageSrc: any;
  driverData:any=[];
  driveruploadedDocCount:number;

  driverDocumentList:any=[
    { document_name: "profile_image", doc_name:"Profile Image", image_name:'licence.png'},
    { document_name: "aadhar_front", doc_name:"Aadhar Card Front", image_name:'aadhar.png'},
    { document_name: "aadhar_back", doc_name:"Aadhar Card Back", image_name:'aadhar.png'},
    { document_name: "pancard", doc_name:"Pancard", image_name:'pancard.png'},
    { document_name: "licence", doc_name:"Driver Licence", image_name:'licence.png'},
    { document_name: "police_verification", doc_name:"Driver Police Verification", image_name:'licence.png'},
  ]

  constructor(private modalService: ModalService, private Actrouter:ActivatedRoute, private api:DriverService) { 
    this.Actrouter.params.subscribe(paramsId => {
      this.driver_id = paramsId.driver_id;
    });
  }

  ngOnInit(): void {
    this.getDriverDoc(this.driver_id);
    this.getDriverDetails();
  }

  async getDriverDetails(){
    await this.api.getSingleDriver(this.driver_id).subscribe(response => {
      this.driverData = response.data;
    })
  }

  async getDriverDoc(driver_id){
    await this.api.getDriverDoc(driver_id).subscribe(response => {
      this.driverDocData = response.data;
      this.driveruploadedDocCount = this.driverDocData.length;
    })
  }

  getDriverDocImage(document_name,document_img){
    this.imageSrc = this.api.getDriverDocImage('uploads/driver/'+document_name+'/'+document_img);
  }
  
  openuploadDocModal(content,document_name,document_img){
    this.document_name = document_name;
    this.modalService.open(content)
    this.getDriverDocImage(document_name,document_img);
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
    this.api.driverApproveReject({driver_id:this.driver_id, status:status, reject_reason:this.reject_reason}).subscribe(response => {
      if(status === 1){
        this.driverApproveStatus == 1;
      }
      if(status === 3){
        this.driverApproveStatus == 2;
      }
      this.modalService.dismissall();
      this.getDriverDetails();
    })
  }

}

import { DriverService } from '@/_restapi-services/driver.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent implements OnInit {
  driverdocStatus:number;
  driverDocumentForm:FormGroup
  driver_id: string;
  driverauto_id:string;
  document_name:string;
  fileInputLabel: string;
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
    this.driverDocumentForm = new FormGroup({
      document_img: new FormControl(),
      document_no: new FormControl(),
      driver_id: new FormControl(),
      document_name: new FormControl()
    })
  }

  async getDriverDetails(){
    await this.api.getSingleDriver(this.driver_id).subscribe(response => {
      this.driverData = response.data;
      this.driverauto_id = this.driverData[0]._id;
      if(this.driverData[0].reject_reason != ''){
        this.driverdocStatus = 1;
      }if(this.driverData[0].reject_reason == null){
        this.driverdocStatus = 0;
      }
    })
  }

  async getDriverDoc(driver_id){
    await this.api.getDriverDoc(driver_id).subscribe(response => {
      this.driverDocData = response.data;
      this.driveruploadedDocCount = this.driverDocData.length;
    })
  }
  
  openuploadDocModal(content,document_name,document_img){
    this.document_name = document_name;
    this.modalService.open(content)
    this.getDriverDocImage(document_name,document_img);
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.driverDocumentForm.get('document_img').setValue(file);
  }

  PutdriverStatus(){
    this.api.PutdriverStatus({ driver_id:this.driver_id, status:2, reject_reason:'' }).subscribe(response => {
      this.getDriverDetails();
      this.driverdocStatus = 2;
    })
  }

  getDriverDocImage(document_name,document_img){
    this.imageSrc = this.api.getDriverDocImage('uploads/driver/'+document_name+'/'+document_img);
  }

  onSubmit(){
    if(this.driverDocumentForm.valid){
      const formData = new FormData();
      formData.append('document_img', this.driverDocumentForm.get('document_img').value);
      formData.append('document_no', this.driverDocumentForm.get('document_no').value);
      formData.append('driver_id', this.driverDocumentForm.get('driver_id').value);
      formData.append('document_name', this.driverDocumentForm.get('document_name').value);
      this.api.postDriverDoc(formData).subscribe((response: any) => {
        this.modalService.dismissall();
        this.getDriverDoc(this.driver_id);
      })
    }
  }

}

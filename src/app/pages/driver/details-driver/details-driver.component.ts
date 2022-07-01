import { DriverService } from '@/_restapi-services/driver.service';
import { RideService } from '@/_restapi-services/ride.service';
import { ModalService } from '@/_services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-driver',
  templateUrl: './details-driver.component.html',
  styleUrls: ['./details-driver.component.scss']
})
export class DetailsDriverComponent implements OnInit {
  driverDocumentForm:FormGroup;
  driverDeactiveForm: FormGroup;
  driverActiveForm: FormGroup;
  driver_id: string;
  driverauto_id:string;
  document_name:string;
  fileInputLabel: string;
  driverDocData: any=[];
  imageSrc: any;
  driverData:any=[];
  driveruploadedDocCount:number;
  driverDeactiveStatus:string='4';
  driverActiveStatus:String='3';
  driverDeactiveAction:string='Deactivate Driver';
  driverActiveAction:string='Activate Driver';
  driverHistoryData:any=[];

  rideStatus:any=[
    { '2': "Ride Assign To Driver", '3':"Ride Started", '4':'Reached Pickup Location', '5':'Reached Drop Location', '6':'Payment Done', '7':'Ride Completed', '8':'Ride Canclled'},
  ]

  driverDocumentList:any=[
    { document_name: "profile_image", doc_name:"Profile Image", image_name:'licence.png'},
    { document_name: "aadhar_front", doc_name:"Aadhar Card Front", image_name:'aadhar.png'},
    { document_name: "aadhar_back", doc_name:"Aadhar Card Back", image_name:'aadhar.png'},
    { document_name: "pancard", doc_name:"Pancard", image_name:'pancard.png'},
    { document_name: "licence", doc_name:"Driver Licence", image_name:'licence.png'},
    { document_name: "police_verification", doc_name:"Driver Police Verification", image_name:'licence.png'},
  ]
  rideData: any;

  constructor(private modalService: ModalService, private Actrouter:ActivatedRoute, private api:DriverService, private rideApi:RideService, private router:Router) { 
    this.Actrouter.params.subscribe(paramsId => {
      this.driver_id = paramsId.driver_id;
    });
  }

  ngOnInit(): void {
    this.getDriverDoc(this.driver_id);
    this.getDriverDetails();
    this.getDriverHistory();
    this.getRideByDriver(this.driver_id)
    this.driverDocumentForm = new FormGroup({
      document_img: new FormControl(),
      document_no: new FormControl(),
      driver_id: new FormControl(),
      document_name: new FormControl()
    })

    this.driverDeactiveForm = new FormGroup({
      reason: new FormControl(),
      remark: new FormControl(),
      driver_id: new FormControl(),
      driverhistorystatus: new FormControl(),
      action: new FormControl()
    })

    this.driverActiveForm = new FormGroup({
      reason: new FormControl(),
      remark: new FormControl(),
      driver_id: new FormControl(),
      driverhistorystatus: new FormControl(),
      action: new FormControl()
    })
  }

  async getDriverDetails(){
    await this.api.getSingleDriver(this.driver_id).subscribe(response => {
      this.driverData = response.data;
      this.driverauto_id = this.driverData[0]._id;
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

  openModalContent(content){
    this.modalService.open(content);
  }

  driverDeactiveSubmit(){
    if(this.driverDeactiveForm.valid){
      this.api.postDriverHistory(this.driverDeactiveForm.value).subscribe(response => {
        this.modalService.dismissall();
        this.driverDeactiveForm.reset();
      })
    }
  }

  driverActiveSubmit(){
    if(this.driverActiveForm.valid){
      this.api.postDriverHistory(this.driverActiveForm.value).subscribe(response => {
        this.modalService.dismissall();
        this.driverActiveForm.reset();
      })
    }
  }

  getDriverHistory(){
    this.api.getDriverHistory(this.driver_id).subscribe(response => {
      this.driverHistoryData = response.data;
    })
  }

  getRideByDriver(driver_id){
    this.rideApi.getRideByDriver(driver_id).subscribe(response => {
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

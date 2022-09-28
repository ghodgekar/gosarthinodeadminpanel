import { AlertService } from '@/_services/alert.service';
import { AdminService } from '@/_restapi-services/admin.service';
import { ModalService } from '@/_services/modal.service';
import { ToastrNotifyService } from '@/_services/toastr-notify.service';
import { ExclService } from '@/_services/excl.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '@/_services/app.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-active-admin',
  templateUrl: './active-admin.component.html',
  styleUrls: ['./active-admin.component.scss']
})
export class ActiveAdminComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  public adminForm: FormGroup;
  public adminData:any=[];
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false

  constructor(private modalService: ModalService, private toastr:ToastrNotifyService,private alertService: AlertService, public api:AdminService, public appservice:AppService, public exclservice:ExclService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
  }

  ngOnInit(){
    this.getAdmin();
    this.adminForm = new FormGroup({
      full_name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    })
  }

  getAdmin(){
    this.api.adminList().subscribe(response => {
      this.adminData = response.data;
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

  openAddCustomerModal(content){
    this.modalService.open(content)
  }

  onSubmit() {
    if(this.adminForm.valid){
      this.api.adminSave(this.adminForm.value).subscribe(response => {
        if(response.message){
          this.adminForm.reset();
          this.getAdmin();
          this.modalService.dismissall();
        }
      })
    }
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'active admin');
  }
}

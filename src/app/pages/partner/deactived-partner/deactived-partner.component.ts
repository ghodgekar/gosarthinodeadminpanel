import { PartnerService } from '@/_restapi-services/partner.service';
import { ExclService } from '@/_services/excl.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-deactived-partner',
  templateUrl: './deactived-partner.component.html',
  styleUrls: ['./deactived-partner.component.scss']
})
export class DeactivedPartnerComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  partnerData: any;

  constructor(private api:PartnerService, private router:Router, public exclservice:ExclService) { }

  ngOnInit(): void {
    this.getPartner(4);
  }  
  
  getPartner(statusid){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getPartner(statusid).subscribe(response => {
      this.partnerData = response.data;
      this.dtTrigger.next();
    })
  }

  openPartnerDetailsPage(partner_id){
    this.router.navigate(['/details-partner',partner_id]);
  }

  exportAsXLSX():void {
    this.exclservice.exportAsExcelFile(this.table.nativeElement, 'deactivated partner');
  }
}

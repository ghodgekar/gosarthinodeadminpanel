import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocPartnerComponent } from './upload-doc-partner.component';

describe('UploadDocPartnerComponent', () => {
  let component: UploadDocPartnerComponent;
  let fixture: ComponentFixture<UploadDocPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

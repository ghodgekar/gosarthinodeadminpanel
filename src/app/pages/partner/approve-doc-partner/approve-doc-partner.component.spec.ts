import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDocPartnerComponent } from './approve-doc-partner.component';

describe('ApproveDocPartnerComponent', () => {
  let component: ApproveDocPartnerComponent;
  let fixture: ComponentFixture<ApproveDocPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDocPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDocPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

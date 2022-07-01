import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledPartnerComponent } from './enrolled-partner.component';

describe('EnrolledPartnerComponent', () => {
  let component: EnrolledPartnerComponent;
  let fixture: ComponentFixture<EnrolledPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

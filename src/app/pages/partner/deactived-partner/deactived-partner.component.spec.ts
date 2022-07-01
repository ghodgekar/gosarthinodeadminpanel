import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivedPartnerComponent } from './deactived-partner.component';

describe('DeactivedPartnerComponent', () => {
  let component: DeactivedPartnerComponent;
  let fixture: ComponentFixture<DeactivedPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivedPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivedPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

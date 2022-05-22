import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePartnerComponent } from './active-partner.component';

describe('ActivePartnerComponent', () => {
  let component: ActivePartnerComponent;
  let fixture: ComponentFixture<ActivePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPartnerComponent } from './login-partner.component';

describe('LoginPartnerComponent', () => {
  let component: LoginPartnerComponent;
  let fixture: ComponentFixture<LoginPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

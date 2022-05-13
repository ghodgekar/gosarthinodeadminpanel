import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveCustomerComponent } from './deactive-customer.component';

describe('DeactiveCustomerComponent', () => {
  let component: DeactiveCustomerComponent;
  let fixture: ComponentFixture<DeactiveCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

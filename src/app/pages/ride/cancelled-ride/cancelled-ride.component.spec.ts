import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledRideComponent } from './cancelled-ride.component';

describe('CancelledRideComponent', () => {
  let component: CancelledRideComponent;
  let fixture: ComponentFixture<CancelledRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingRideComponent } from './ongoing-ride.component';

describe('OngoingRideComponent', () => {
  let component: OngoingRideComponent;
  let fixture: ComponentFixture<OngoingRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

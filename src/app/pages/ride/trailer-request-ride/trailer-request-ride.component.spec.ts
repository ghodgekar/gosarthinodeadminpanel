import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerRequestRideComponent } from './trailer-request-ride.component';

describe('TrailerRequestRideComponent', () => {
  let component: TrailerRequestRideComponent;
  let fixture: ComponentFixture<TrailerRequestRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerRequestRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerRequestRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRideComponent } from './assign-ride.component';

describe('AssignRideComponent', () => {
  let component: AssignRideComponent;
  let fixture: ComponentFixture<AssignRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

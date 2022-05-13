import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRideComponent } from './completed-ride.component';

describe('CompletedRideComponent', () => {
  let component: CompletedRideComponent;
  let fixture: ComponentFixture<CompletedRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

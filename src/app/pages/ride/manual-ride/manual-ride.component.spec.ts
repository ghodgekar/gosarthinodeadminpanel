import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualRideComponent } from './manual-ride.component';

describe('ManualRideComponent', () => {
  let component: ManualRideComponent;
  let fixture: ComponentFixture<ManualRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

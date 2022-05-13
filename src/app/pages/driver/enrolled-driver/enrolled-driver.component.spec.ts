import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledDriverComponent } from './enrolled-driver.component';

describe('EnrolledDriverComponent', () => {
  let component: EnrolledDriverComponent;
  let fixture: ComponentFixture<EnrolledDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

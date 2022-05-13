import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivedDriverComponent } from './deactived-driver.component';

describe('DeactivedDriverComponent', () => {
  let component: DeactivedDriverComponent;
  let fixture: ComponentFixture<DeactivedDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivedDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

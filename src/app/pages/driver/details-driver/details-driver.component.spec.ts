import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDriverComponent } from './details-driver.component';

describe('DetailsDriverComponent', () => {
  let component: DetailsDriverComponent;
  let fixture: ComponentFixture<DetailsDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

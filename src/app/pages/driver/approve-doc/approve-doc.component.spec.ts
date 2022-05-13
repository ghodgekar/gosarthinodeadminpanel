import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDocComponent } from './approve-doc.component';

describe('ApproveDocComponent', () => {
  let component: ApproveDocComponent;
  let fixture: ComponentFixture<ApproveDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAdminComponent } from './active-admin.component';

describe('ActiveAdminComponent', () => {
  let component: ActiveAdminComponent;
  let fixture: ComponentFixture<ActiveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

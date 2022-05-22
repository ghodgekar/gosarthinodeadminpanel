import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSidebarPartnerComponent } from './menu-sidebar-partner.component';

describe('MenuSidebarPartnerComponent', () => {
  let component: MenuSidebarPartnerComponent;
  let fixture: ComponentFixture<MenuSidebarPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSidebarPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSidebarPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

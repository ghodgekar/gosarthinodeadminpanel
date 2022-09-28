import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSidebarAdminComponent } from './menu-sidebar-admin.component';

describe('MenuSidebarAdminComponent', () => {
  let component: MenuSidebarAdminComponent;
  let fixture: ComponentFixture<MenuSidebarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSidebarAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSidebarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

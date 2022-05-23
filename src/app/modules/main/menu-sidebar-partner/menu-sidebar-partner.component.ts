import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@/_services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
  selector: 'app-menu-sidebar-partner',
  templateUrl: './menu-sidebar-partner.component.html',
  styleUrls: ['./menu-sidebar-partner.component.scss']
})
export class MenuSidebarPartnerComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user;
  public menu = MENU;

  constructor(
      public appService: AppService,
      private store: Store<AppState>
  ) {}

  ngOnInit() {
      this.ui = this.store.select('ui');
      this.ui.subscribe((state: UiState) => {
          this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
      });
      this.user = this.appService.user;
  }
}

export const MENU = [
  {
      name: 'Dashboard',
      path: ['/']
  },
  {
      name: 'Ride',
      children: [
          {
              name: 'Ongoing Rides',
              path: ['/ongoing-ride']
          },
          {
              name: 'Scheduled Rides',
              path: ['/scheduled-ride']
          },
          {
              name: 'Completed Rides',
              path: ['/completed-ride']
          },
          {
              name: 'Cancelled Rides',
              path: ['/cancelled-ride']
          },
          {
              name: 'New Rides',
              path: ['/assign-ride']
          }
      ]
  },
  {
      name: 'Customer',
      children: [
          {
              name: 'Active Customer',
              path: ['/active-customer']
          }
      ]
  },
  {
      name: 'Manual Dispatch',
      path: ['/manual-dispatch']
  },
];

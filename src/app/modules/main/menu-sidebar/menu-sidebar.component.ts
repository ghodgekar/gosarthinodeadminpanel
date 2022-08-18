import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@/_services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
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
    // {
    //     name: 'Blank',
    //     path: ['/blank']
    // },
    // {
    //     name: 'Main Menu',
    //     children: [
    //         {
    //             name: 'Sub Menu',
    //             path: ['/sub-menu-1']
    //         },

    //         {
    //             name: 'Blank',
    //             path: ['/sub-menu-2']
    //         }
    //     ]
    // },
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
                name: 'Assign Rides',
                path: ['/assign-ride']
            },
            {
                name: 'Trailer Request',
                path: ['/trailer-request-ride']
            }
        ]
    },
    {
        name: 'Driver',
        children: [
            {
                name: 'Active Driver',
                path: ['/active-driver']
            },
            {
                name: 'Deactived Driver',
                path: ['/deactive-driver']
            },
            {
                name: 'Enrolled Driver',
                path: ['/enrolled-driver']
            }
        ]
    },
    // {
    //     name: 'Customer',
    //     children: [
    //         {
    //             name: 'Active Customer',
    //             path: ['/active-customer']
    //         }
    //     ]
    // },
    {
        name: 'Partner',
        children: [
            {
                name: 'Active Partner',
                path: ['/active-partner']
            },
            {
                name: 'Deactived Partner',
                path: ['/deactive-partner']
            },
            {
                name: 'Enrolled Partner',
                path: ['/enrolled-partner']
            }
        ]
    },
    {
        name: 'Raise Request',
        path: ['/manual-dispatch']
    },
];

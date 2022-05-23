import {Component, OnInit} from '@angular/core';
import {AppService} from '@/_services/app.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(public appService: AppService) {}

    ngOnInit(): void {
        this.user = this.appService.user;
    }

    logout() {
        this.appService.logout();
    }

    logoutPartner(){
        this.appService.logoutPartner();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}

import {Component, HostListener} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // @HostListener('window:beforeunload', ['$event'])
    // public beforeunloadHandler($event) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('role');
    // }
}

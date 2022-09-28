import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ActiveCustomerComponent } from './pages/customer/active-customer/active-customer.component';
import { DeactiveCustomerComponent } from './pages/customer/deactive-customer/deactive-customer.component';

import { DataTablesModule } from 'angular-datatables';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { SuccessInterceptor } from './_helpers/success.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { ActiveDriverComponent } from './pages/driver/active-driver/active-driver.component';
import { DeactivedDriverComponent } from './pages/driver/deactived-driver/deactived-driver.component';
import { EnrolledDriverComponent } from './pages/driver/enrolled-driver/enrolled-driver.component';
import { ManualRideComponent } from './pages/ride/manual-ride/manual-ride.component';
import { UploadDocComponent } from './pages/driver/upload-doc/upload-doc.component';
import { ApproveDocComponent } from './pages/driver/approve-doc/approve-doc.component';
import { DetailsDriverComponent } from './pages/driver/details-driver/details-driver.component';

import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { ScheduledRideComponent } from './pages/ride/scheduled-ride/scheduled-ride.component';
import { OngoingRideComponent } from './pages/ride/ongoing-ride/ongoing-ride.component';
import { CompletedRideComponent } from './pages/ride/completed-ride/completed-ride.component';
import { CancelledRideComponent } from './pages/ride/cancelled-ride/cancelled-ride.component';
import { RideDetailsComponent } from './pages/ride/ride-details/ride-details.component';   // agm-direction
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ActivePartnerComponent } from './pages/partner/active-partner/active-partner.component';
import { LoginPartnerComponent } from './pages/partner/login-partner/login-partner.component';
import { MenuSidebarPartnerComponent } from './modules/main/menu-sidebar-partner/menu-sidebar-partner.component';
import { AssignRideComponent } from './pages/ride/assign-ride/assign-ride.component';
import { EnrolledPartnerComponent } from './pages/partner/enrolled-partner/enrolled-partner.component';
import { DeactivedPartnerComponent } from './pages/partner/deactived-partner/deactived-partner.component';
import { DetailsPartnerComponent } from './pages/partner/details-partner/details-partner.component';
import { ApproveDocPartnerComponent } from './pages/partner/approve-doc-partner/approve-doc-partner.component';
import { UploadDocPartnerComponent } from './pages/partner/upload-doc-partner/upload-doc-partner.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { TrailerRequestRideComponent } from './pages/ride/trailer-request-ride/trailer-request-ride.component';
import { ActiveAdminComponent } from './pages/admin/active-admin/active-admin.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { MenuSidebarAdminComponent } from './modules/main/menu-sidebar-admin/menu-sidebar-admin.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        ControlSidebarComponent,
        SelectComponent,
        CheckboxComponent,
        ActiveCustomerComponent,
        DeactiveCustomerComponent,
        LoaderComponent,
        ActiveDriverComponent,
        DeactivedDriverComponent,
        EnrolledDriverComponent,
        ManualRideComponent,
        UploadDocComponent,
        ApproveDocComponent,
        DetailsDriverComponent,
        ScheduledRideComponent,
        OngoingRideComponent,
        CompletedRideComponent,
        CancelledRideComponent,
        RideDetailsComponent,
        ActivePartnerComponent,
        LoginPartnerComponent,
        MenuSidebarPartnerComponent,
        AssignRideComponent,
        EnrolledPartnerComponent,
        DeactivedPartnerComponent,
        DetailsPartnerComponent,
        ApproveDocPartnerComponent,
        UploadDocPartnerComponent,
        TrailerRequestRideComponent,
        ActiveAdminComponent,
        AdminLoginComponent,
        MenuSidebarAdminComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        AgmCoreModule.forRoot({ // @agm/core
          apiKey: 'AIzaSyB5iQXg4Ftl8qA-7iLmHDdlH_2_r3CCyYk',
          libraries:['geometry','places'],
        }),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AgmDirectionModule,
        GooglePlaceModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule,
        DataTablesModule,
        TabsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SuccessInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        {
           provide: HTTP_INTERCEPTORS,
           useClass: LoaderInterceptor,
           multi: true,
        }
      ],
    bootstrap: [AppComponent]
})
export class AppModule {}

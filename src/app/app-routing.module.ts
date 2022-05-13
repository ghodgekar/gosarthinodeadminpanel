import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@/_guards/auth.guard';
import {NonAuthGuard} from '@/_guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { ActiveCustomerComponent } from '@pages/customer/active-customer/active-customer.component';
import { DeactiveCustomerComponent } from '@pages/customer/deactive-customer/deactive-customer.component';
import { ActiveDriverComponent } from '@pages/driver/active-driver/active-driver.component';
import { DeactivedDriverComponent } from '@pages/driver/deactived-driver/deactived-driver.component';
import { EnrolledDriverComponent } from '@pages/driver/enrolled-driver/enrolled-driver.component';
import { ManualRideComponent } from '@pages/ride/manual-ride/manual-ride.component';
import { UploadDocComponent } from '@pages/driver/upload-doc/upload-doc.component';
import { ApproveDocComponent } from '@pages/driver/approve-doc/approve-doc.component';
import { DetailsDriverComponent } from '@pages/driver/details-driver/details-driver.component';
import { ScheduledRideComponent } from '@pages/ride/scheduled-ride/scheduled-ride.component';
import { OngoingRideComponent } from '@pages/ride/ongoing-ride/ongoing-ride.component';
import { CompletedRideComponent } from '@pages/ride/completed-ride/completed-ride.component';
import { CancelledRideComponent } from '@pages/ride/cancelled-ride/cancelled-ride.component';
import { RideDetailsComponent } from '@pages/ride/ride-details/ride-details.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'active-customer',
                component: ActiveCustomerComponent
            },
            {
                path: 'deactive-customer',
                component: DeactiveCustomerComponent
            },
            {
                path: 'active-driver',
                component: ActiveDriverComponent
            },
            {
                path: 'deactive-driver',
                component: DeactivedDriverComponent
            },
            {
                path: 'enrolled-driver',
                component: EnrolledDriverComponent
            },
            {
                path: 'upload-doc/:driver_id',
                component: UploadDocComponent
            },
            {
                path: 'approve-doc/:driver_id',
                component: ApproveDocComponent
            },
            {
                path: 'driver-details/:driver_id',
                component: DetailsDriverComponent
            },
            {
                path: 'manual-dispatch',
                component: ManualRideComponent
            },
            {
                path: 'scheduled-ride',
                component: ScheduledRideComponent
            },
            {
                path: 'ongoing-ride',
                component: OngoingRideComponent
            },
            {
                path: 'completed-ride',
                component: CompletedRideComponent
            },
            {
                path: 'cancelled-ride',
                component: CancelledRideComponent
            },
            {
                path: 'ride-details/:ride_id/:ride_status',
                component: RideDetailsComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}

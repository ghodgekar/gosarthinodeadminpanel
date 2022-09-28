import { AdminService } from '@/_restapi-services/admin.service';
import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  @HostBinding('class') class = 'login-box';
  loginAdminForm:FormGroup
  constructor(
    private renderer: Renderer2,
    public api:AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.renderer.addClass(
        document.querySelector('app-root'),
        'login-page'
    );
    this.loginAdminForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  loginAdminFormSubmit(){
    this.api.adminLogin(this.loginAdminForm.value).subscribe(response => {
      localStorage.setItem('token', JSON.stringify(response.data));
      localStorage.setItem('role', response.role);
      localStorage.setItem('is_admin_menu', response.data.is_admin_menu);
      this.router.navigate(['/']);
    })
  }
}

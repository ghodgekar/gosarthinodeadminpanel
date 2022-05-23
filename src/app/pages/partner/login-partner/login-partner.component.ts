import { PartnerService } from '@/_restapi-services/partner.service';
import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-partner',
  templateUrl: './login-partner.component.html',
  styleUrls: ['./login-partner.component.scss']
})
export class LoginPartnerComponent implements OnInit {
  @HostBinding('class') class = 'login-box';
  loginPartnerForm:FormGroup
  constructor(
    private renderer: Renderer2,
    public api:PartnerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.renderer.addClass(
        document.querySelector('app-root'),
        'login-page'
    );
    this.loginPartnerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  loginPartnerFormSubmit(){
    this.api.partnerLogin(this.loginPartnerForm.value).subscribe(response => {
      localStorage.setItem('token', JSON.stringify(response.data));
      localStorage.setItem('role', response.role);
      this.router.navigate(['/']);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService, private toastr: ToastrService
  ) {}

  ngOnInit() {
      this.authService.logout();
  }

  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
        if (response.access_token !== null ) {
        this.authService.setUser(response);
      }
    }, error => {
      this.toastr.error('نام کاربری یا رمز عبور اشتباه است.', 'اعتبارسنجی ناموفق');
      // if (error.status === 400) {
      //       this.toastr.error('نام کاربری یا رمز عبور اشتباه است.', 'اعتبارسنجی ناموفق');
      //     } else {
      //       console.log(error);
      //     }
    });
  }
}

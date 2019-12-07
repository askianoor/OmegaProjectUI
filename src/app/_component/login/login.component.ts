import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService // , private toastr: ToastrService
  ) {}

  ngOnInit() {
      this.authService.logout();
  }

  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
        if (response.access_token !== null ) {
        this.authService.setUser(response);
        Swal.fire({
          title: 'ورود موفق',
          text: 'به پنل مدیریت حساب خوش آمدید.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500});
      }
    }, error => {
      Swal.fire({
        title: 'اعتبارسنجی ناموفق',
        text: 'نام کاربری یا رمز عبور اشتباه است!',
        icon: 'error'});
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          Swal.fire({
            title: 'ثبت نام موفق',
            text: 'نام کاربری شما با موفقیت ساخته شد.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500});
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                  Swal.fire({
                    title: 'ثبت نام ناموفق',
                    text: 'نام کاربری تکراری میباشد!',
                    icon: 'error'});
                  break;

              default:
                  Swal.fire({
                    title: 'ثبت نام ناموفق',
                    text: 'سیستم قادر به ساخت نام کاربری برای شما نمی باشد!',
                    icon: 'error'});
                  break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}

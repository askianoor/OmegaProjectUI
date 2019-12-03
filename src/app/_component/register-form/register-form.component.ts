import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('نام کاربری ساخته شد!', 'ثبت نام موفق آمیز بود.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('نام کاربری تکراری میباشد!', 'ثبت نام ناموفق');
                break;

              default:
              this.toastr.error(element.description, 'ثبت نام ناموفق');
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

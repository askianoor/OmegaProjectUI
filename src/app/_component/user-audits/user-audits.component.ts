import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../_service/auth.service';
import { UserAuditsResponse, UserAudits } from 'src/app/_models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-audits',
  templateUrl: './user-audits.component.html',
  styleUrls: ['./user-audits.component.css']
})
export class UserAuditsComponent implements OnInit {
  userAuditsResponse: UserAuditsResponse;
  userAudits: UserAudits;
  fullAccess = false;
  totalItems = 0;
  paginationconfig: any;
  FromDate = ' ';
  UntilDate = ' ';

  constructor(private authService: AuthService) {
    this.userAuditsResponse = null;

    this.paginationconfig = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.totalItems
    };
   }

  ngOnInit() {
    this.getAudits();
  }

  getAudits() {
    this.authService.getAudits().subscribe(response => {
      if (response !== null) {
      this.userAudits = response.userAudits;
      this.fullAccess = response.fullAccess;
      this.totalItems = response.totalItem;
      }
   }, error => {
     this.authService.logout();
     Swal.fire({
      title: 'اعتبارسنجی ناموفق',
      text: 'توکن شما دیگر معتبر نمیباشد! لطفا دوباره وارد شوید.',
      icon: 'error'});
   });
  }

  pageChanged(event) {
    this.paginationconfig.currentPage = event;
  }

  getFilteredData() {
    if (this.FromDate === ' ' || this.UntilDate === ' ') {
      Swal.fire({
        title: 'فیلتر ناموفق',
        text: 'لطفا هر دو فیلد "از تاریخ" و "تا تاریخ" را مشخص فرمایید.',
        icon: 'warning',
        timer: 2500 });
     } else {
      const fromDate = new Date(this.FromDate);
      const untilDate = new Date(this.UntilDate);
      this.authService.getFilteredData(fromDate.toJSON(), untilDate.toJSON()).subscribe(response => {
        if (response !== null) {
        this.userAudits = response.userAudits;
        this.fullAccess = response.fullAccess;
        this.totalItems = response.totalItem;
        }
     }, error => {
       this.authService.logout();
       Swal.fire({
        title: 'اعتبارسنجی ناموفق',
        text: 'توکن شما دیگر معتبر نمیباشد! لطفا دوباره وارد شوید.',
        icon: 'error'});
     });
     }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { UserProfileResponse } from 'src/app/_models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: any = {};
  userDetails: UserProfileResponse;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.model.action = 'stuff';
    this.authService.getProfileData().subscribe(response => {
       if (response.userName !== null) {
        this.userDetails = response;
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

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { UserProfileResponse, UserAuditsResponse, UserAudits } from 'src/app/_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any = {};

  userDetails: UserProfileResponse;
  userAuditsResponse: UserAuditsResponse;
  userAudits: UserAudits;
  fullAccess = false;

  constructor( private authService: AuthService) {
    this.userAuditsResponse = null;
   }

  ngOnInit() {
    this.getProfileData();
    this.getAudits();
  }

  getProfileData() {
    this.model.action = 'stuff';
    this.authService.getProfileData().subscribe(response => {
       if (response.userName !== null) {
        this.userDetails = response;
       }
    }, error => {
      this.authService.logout();
    });
  }

  getAudits() {
    this.authService.getAudits().subscribe(response => {
      if (response !== null) {
      this.userAudits = response.userAudits;
      this.fullAccess = response.fullAccess;
      }
   }, error => {
     this.authService.logout();
   });
  }

  logout() {
    this.authService.logout();
  }

}

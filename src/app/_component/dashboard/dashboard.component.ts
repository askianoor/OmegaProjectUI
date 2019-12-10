import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileMenu = false;
  userAuditsMenu = false;

  constructor( private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  showDashboard() {
    this.profileMenu = false;
    this.userAuditsMenu = false;
  }

  showUserProfile() {
    this.userAuditsMenu = false;
    this.profileMenu = true;
  }

  showUserAudits() {
    this.profileMenu = false;
    this.userAuditsMenu = true;
  }
}

import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.checkUser();
    this.auth.userStatusUpdated.subscribe(() => {
      this.checkUser();
    } );
  }

  checkUser() {
    if (this.auth.isAuth()) {
      this.user = 1;
    } else {
      this.user = null;
    }
  }
  logout() {
    this.auth.logout();
  }
}

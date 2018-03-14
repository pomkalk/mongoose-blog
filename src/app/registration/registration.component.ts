import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  errors = null;
  isSending = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private notification: NotificationsService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'password_confirm': ''
    });
  }

  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  registration() {
    this.isSending = true;
    this.auth.registerUser(this.userForm.value).subscribe((response) => {
      this.isSending = false;
      if (response.errors) {
        this.errors = response.errors;
        console.log(response.errors);
        return;
      }
      this.router.navigate(['/login']).then(() => {
        this.notification.success('congratulations', response.message, { timeOut: 3000 });
      });
    });
  }

}

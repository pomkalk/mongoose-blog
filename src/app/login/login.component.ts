import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': '',
      'password': ''
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe((response) => {
      if (response.errors) {
        this.errors = response.errors;
        console.log(response.errors);
        return;
      }
      this.router.navigate(['/']);
    });
  }
}

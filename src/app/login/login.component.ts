import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService, private authGuard: AuthGuardService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const _email: string = this.loginForm.get('email').value;
    const _password: string = this.loginForm.get('password').value;

    if(_email && _password) {
      this.authentication.login(_email, _password).subscribe(
        response => {
          localStorage.setItem('token',response.accessToken);
          this.router.navigateByUrl('/').then(() => location.reload());
        },
        error => {
          alert(error.error);
        }
      );
    }
    else {
      alert('Email or Password is incorrect');
    }
  }
}

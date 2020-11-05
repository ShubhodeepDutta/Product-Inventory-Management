import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  account = this.formBuilder.group(
    {
      name: [''],
      email: [''],
      contact: [''],
      location: ['']
    }
  );

  constructor(private authentication: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    var payload = jwt_decode(localStorage.getItem('token'));
    this.authentication.getUser(payload.sub).subscribe(
      (user: any) => {
        this.account.get('name').setValue(`${user.firstname} ${user.lastname}`);
        this.account.get('email').setValue(`${user.email}`);
        this.account.get('contact').setValue(`${user.contact}`);
        this.account.get('location').setValue(`${user.location}`);
      },
      error => console.log('error while retrieving user details', error)
    );
  }

}

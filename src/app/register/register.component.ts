import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { CityService } from '../service/city.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cities: string[];

  registerForm = this.formBuilder.group({
    id: [uuidv4()],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    location: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confPass: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService, private cityService: CityService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.cityService.getCities().subscribe(
      (cities: any) => this.cities = cities,
      error => console.log('error while retrieving city names', error)
    )
  }

  register() {
    const _id: any = this.registerForm.get('id').value;
    const _firstname: string = this.registerForm.get('firstname').value;
    const _lastname: string = this.registerForm.get('lastname').value;
    const _email: string = this.registerForm.get('email').value;
    const _contact: number = this.registerForm.get('contact').value;
    const _location: string = this.registerForm.get('location').value;
    const _password: string = this.registerForm.get('password').value;
    const _confPass: string = this.registerForm.get('confPass').value;

    if(_password != _confPass) {
      alert('Confimation password is not same as Password');
      return null;
    }
    else if(_firstname && _lastname && _email && _password && _contact) {
      this.authentication.register(_id, _email, _password, _firstname, _lastname, _contact, _location).subscribe(
        () => alert('Successfuly Registered')
      );
    }
    else {
      alert('All fields are required !!!');
    }

  }

}

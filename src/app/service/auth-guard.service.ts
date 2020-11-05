import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(this.isAuthenticated()) {
      return true;
    }
    else {
      alert('Access Denied !!!')
      this.router.navigateByUrl('/loginpage');
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    if(this.getToken() != null) return true;
    else return false;
  }

}

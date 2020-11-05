import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities: Observable<Object>;
  private citiesURL = "http://localhost:3000/city";

  constructor(private httpClient: HttpClient) { }

  retrieveCities() {
    return this.httpClient.get(this.citiesURL);
  }

  getCities() {
    this.cities = this.retrieveCities();
    return this.cities;
  }
}

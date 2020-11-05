import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuardService } from './service/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsComponent]
})
export class AppComponent implements OnInit {
  private componentReference: any;
  profileBool: boolean = false;

  searchForm = this.formBuilder.group({
    searchString: ['']
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.profileBool = this.authGuard.isAuthenticated();
  }

  onActivate(reference) {
    this.componentReference = reference;
  }

  onSubmit() {
    this.router.navigateByUrl('/');
    this.componentReference.searchProduct(this.searchForm.get('searchString').value);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  deleteProducts() {
    this.router.navigateByUrl('/');
    this.componentReference.deleteProducts();
  }

}

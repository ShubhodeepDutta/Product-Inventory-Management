import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(ProductListComponent) productList: ProductListComponent;

  priceChecked = true;
  descriptionChecked = true;
  companyChecked = true;
  selected: string;

  constructor() { }

  ngOnInit(): void {
  }

  isPriceChecked(checked) {
    this.productList.isPriceChecked(checked);
  }

  isDescriptionChecked(checked) {
    this.productList.isDescriptionChecked(checked);
  }

  isCompanyChecked(checked) {
    this.productList.isCompanyChecked(checked);
  }

  selection(value) {
    this.productList.orderProducts(value);
  }

  searchProduct(value: string) {
    this.productList.searchProduct(value);
  }

  deleteProducts() {
    this.productList.deleteProducts();
  }

}

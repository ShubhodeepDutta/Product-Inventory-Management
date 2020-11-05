import { Component, Input, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  _priceChecked = true;
  _descriptionChecked = true;
  _companyChecked = true;
  products: Object;
  displayBool: boolean = false;
  public first: string = "";
  public previous: string = "";
  public next: string = "";
  public last: string = "";
  _displayPage = false;
  _displayName = false;
  _displayCompany = false;
  _displayPrice = false;
  _displayQuantity = false;
  _displayRevPrice = false;

  constructor(private productListService: ProductListService, private authGuard: AuthGuardService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getPageProducts("");
    this.displayBool = this.authGuard.isAuthenticated();
  }

  getProducts() {
    this.productListService.getProducts().subscribe(
      () => {
        console.log('All the products retreived');
      },
      error => console.log('error occured while retrieving products from server', error)
    );
  }

  getPageProducts(reqUrl) {
    this._displayPage = true;
    this._displayName = false;
    this._displayCompany = false;
    this._displayPrice = false;
    this._displayQuantity = false;
    this._displayRevPrice = false;
    this.productListService.getPageProducts(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error while loading products', error)
    );
  }

  parseLinkHeader(header) {
    if(header.length ==0) return;

    let parts = header.split(',');
    var links = {}
    parts.forEach(element => {
      let section = element.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();

      links[name] = url;
    });

    if(links['prev']){
      this.previous = links['prev'];
    }

    if(links['next']){
      this.next = links['next'];
    }

    this.first = links['first'];
    this.last = links['last'];
  }

  isPriceChecked(priceChecked: boolean){
    this._priceChecked = priceChecked;
  }

  isDescriptionChecked(descriptionChecked: boolean){
    this._descriptionChecked = descriptionChecked;
  }

  isCompanyChecked(companyChecked: boolean){
    this._companyChecked = companyChecked
  }

  orderProducts(value: string) {
    switch(value) {
      case 'name':
        this.orderByName("");
        // this.productListService.orderByName().subscribe(
        //   (products: any) => this.products = products,
        //   error => console.log('error occured while ordering products', error)
        // );
        break;

      case 'companyName':
        this.orderByCompany("");
        // this.productListService.orderByCompany().subscribe(
        //   (products: any) => this.products = products,
        //   error => console.log('error occured while ordering products', error)
        // );
        break;

      case 'lowToHigh':
        this.orderByPrice("");
        // this.productListService.orderByPrice().subscribe(
        //   (products: any) => this.products = products,
        //   error => console.log('error occured while ordering products', error)
        // );
        break;

      case 'quantity':
        this.orderByQuantity("");
        // this.productListService.orderByQuantity().subscribe(
        //   (products: any) => this.products = products,
        //   error => console.log('error occured while ordering products', error)
        // );
        break;

      case 'highToLow':
        this.reverseByPrice("");
        // this.productListService.reverseByPrice().subscribe(
        //   (products: any) => this.products = products,
        //   error => console.log('error occured while ordering products', error)
        // );
        break;
    }
  }

  orderByName(reqUrl) {
    this._displayPage = false;
    this._displayName = true;
    this._displayCompany = false;
    this._displayPrice = false;
    this._displayQuantity = false;
    this._displayRevPrice = false;
    this.productListService.orderByName(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error occured while ordering products', error)
    );
  }

  orderByCompany(reqUrl) {
    this._displayPage = false;
    this._displayName = false;
    this._displayCompany = true;
    this._displayPrice = false;
    this._displayQuantity = false;
    this._displayRevPrice = false;
    this.productListService.orderByCompany(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error occured while ordering products', error)
    );
  }

  orderByPrice(reqUrl) {
    this._displayPage = false;
    this._displayName = false;
    this._displayCompany = false;
    this._displayPrice = true;
    this._displayQuantity = false;
    this._displayRevPrice = false;
    this.productListService.orderByPrice(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error occured while ordering products', error)
    );
  }

  orderByQuantity(reqUrl) {
    this._displayPage = false;
    this._displayName = false;
    this._displayCompany = false;
    this._displayPrice = false;
    this._displayQuantity = true;
    this._displayRevPrice = false;
    this.productListService.orderByQuantity(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error occured while ordering products', error)
    );
  }

  reverseByPrice(reqUrl) {
    this._displayPage = false;
    this._displayName = false;
    this._displayCompany = false;
    this._displayPrice = false;
    this._displayQuantity = false;
    this._displayRevPrice = true;
    this.productListService.reverseByPrice(reqUrl).subscribe(
      resp => {
        this.products = resp.body;
        this.parseLinkHeader(resp.headers.get('link'));
      },
      error => console.log('error occured while ordering products', error)
    );
  }

  searchProduct(value: string) {
    this.productListService.searchProduct(value).subscribe(
      (products: any) => this.products = products,
      error => console.log('error occured while searching product', error)
    );
  }

  updateCount(product: any) {
    product.clickCount = product.clickCount + 1;
    this.productListService.updateProduct(product).subscribe(
      () => console.log('Count updated successfully'),
      error => console.log('error while updating count', error)
    );
  }

  deleteProduct(product: any) {
    if(confirm('Are you sure, you want to delete?')) {
      this.productListService.deleteProduct(product.id).subscribe(
        () => alert(`${product.name} has been deleted successfully`),
        error => console.log('error while deleting product', error)
      );
    }
    
  }

  deleteProducts() {
    if(confirm('Are you sure, you want to delete?')) {
      let checkBoxList = Array.from(document.getElementsByClassName('form-check-input'));
      let productIdList = [];
      for(let i=0; i<checkBoxList.length; i++) {
        if((checkBoxList[i] as HTMLInputElement).checked) {
          productIdList.push((checkBoxList[i] as HTMLInputElement).value);
        }
      }
      for(let i=0; i<productIdList.length; i++) {
        this.productListService.deleteProduct(productIdList[i]).subscribe(
          () => console.log(`${productIdList[i]} has been deleted successfully`),
          error => console.log(`error while deleting product ${productIdList[i]}`, error)
        );
      }
    }
  }
}

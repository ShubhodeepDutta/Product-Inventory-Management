import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  products: Observable<Object>;
  private productsURL = "http://localhost:3000/products";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.retrieveProducts();
  }

  retrieveProducts() {
    return this.httpClient.get(this.productsURL);
  }

  getProducts() {
    this.products = this.retrieveProducts();
    return this.products;
  }

  getPageProducts(reqUrl) {
    if(reqUrl == "") {
      return this.httpClient.get(`${this.productsURL}?_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
    
  }

  getProductDetails(id: number) {
    return this.httpClient.get<any>(`${this.productsURL}/${id}`);
  }

  addProduct(newProduct: any) {
    return this.httpClient.post(this.productsURL, newProduct, this.httpOptions);
  }

  updateProduct(product: any) {
    return this.httpClient.put<any>(`${this.productsURL}/${product.id}`, product, this.httpOptions);
  }

  deleteProduct(id: any) {
    return this.httpClient.delete<any>(`${this.productsURL}/${id}`);
  }

  orderByName(reqUrl) {
    if(reqUrl == ""){
      return this.httpClient.get(`${this.productsURL}?_sort=name&_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
  }

  orderByCompany(reqUrl) {
    if(reqUrl == ""){
      return this.httpClient.get(`${this.productsURL}?_sort=company&_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
  }

  orderByPrice(reqUrl) {
    if(reqUrl == ""){
      return this.httpClient.get(`${this.productsURL}?_sort=price&_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
  }

  reverseByPrice(reqUrl) {
    if(reqUrl == ""){
      return this.httpClient.get(`${this.productsURL}?_sort=price&_order=desc&_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
  }
  
  orderByQuantity(reqUrl) {
    if(reqUrl == ""){
      return this.httpClient.get(`${this.productsURL}?_sort=quantity&_page=1&_limit=6`, {observe: 'response'});
    }
    return this.httpClient.get(`${reqUrl}`, {observe: 'response'});
  }

  reverseByClick() {
    this.getProducts();
    const orderedProducts = this.products.pipe(
      map((products: any[]) => {
        products.sort((a, b) => a.clickCount<b.clickCount ? 1 : -1);

        return products;
      })
    );

    return orderedProducts;
  }

  searchProduct(value: string) {
    if (value == '') return this.getProducts();

    const filteredProducts = this.products.pipe(
      map((products: any[]) =>
      products.filter(product => {
        let regExp = new RegExp(value, 'i');
        if(product.name.match(regExp) != null || product.company.match(regExp) != null) return product;
      })
    ));

    return filteredProducts;
  }
}

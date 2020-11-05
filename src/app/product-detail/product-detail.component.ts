import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../service/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: any;
  keys = [];
  specBool: boolean = true;

  editForm = this.formBuilder.group({
    name: [''],
    company: [''],
    price: [''],
    quantity: [''],
    description: ['']
  })

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductListService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.id = params['id'],
      error => console.log('error while retreiving id from url parameter', error)
    );
    this.productService.getProductDetails(this.id).subscribe(
      (product: any) => {
        this.product = product;
        this.getKeys(this.product);
      },
      error => console.log('error while retreiving product details', error)
    );
  }

  getKeys(product: any) {
    for(var key in product) {
      if(key != 'id' && key != 'name' && key != 'company' && key != 'price' && key != 'imgsrc' && key != 'description' && key != 'quantity' && key != 'clickCount') {
        this.keys.push(key);
      }
    }

    if(this.keys.length == 0) {
      this.specBool = false;
    }
  }

  restructString(word: string): string {
    word = word.replace(/^./, word[0].toUpperCase());
    return word.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  collapse() {
    if(document.getElementById('collapse').innerText == 'Show More') {
      document.getElementById('collapse').innerText = 'Show Less';
    }
    else {
      document.getElementById('collapse').innerText = 'Show More';
    }
  }

  updateSpecs(key: string) {
    this.product[key] = (document.getElementById(key) as HTMLInputElement).value;
    this.productService.updateProduct(this.product).subscribe(
      () => alert('Successfully Updated'),
      error => console.log('error while updating product', error)
    );
  }

  updateDetails() {
    this.product.name = (document.getElementById('name') as HTMLInputElement).value;
    this.product.company = (document.getElementById('company') as HTMLInputElement).value;
    this.product.price = (document.getElementById('price') as HTMLInputElement).value;
    this.product.quantity = (document.getElementById('quantity') as HTMLInputElement).value;
    this.product.description = (document.getElementById('description') as HTMLTextAreaElement).value;

    this.productService.updateProduct(this.product).subscribe(
      () => alert('Successfully Updated'),
      error => console.log('error while updating product',error)
    );
  }

  updateImage(event: any) {
    let input = event.target.files;
    let file = input[0];
    let reader = new FileReader();
    let product = this.product;
    let productService = this.productService;
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", function() {
      product.imgsrc = reader.result as string;
      productService.updateProduct(product).subscribe(
        () => alert('Image updated Successfully'),
        error => console.log('error while updating image', error)
      );
    });
  }

}

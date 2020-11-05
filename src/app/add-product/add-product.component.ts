import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductListService } from '../service/product-list.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  next: number = 0;
  uploadFile: string;
  addProductForm = this.formBuilder.group({
    id: [uuidv4()],
    name: [''],
    company: [''],
    quantity: [''],
    price: [''],
    clickCount: [0],
    description: ['']
  });

  constructor(private formBuilder: FormBuilder, private productService:ProductListService) { }
  ngOnInit(): void {
  }

  public isDirty() {
    return this.addProductForm.dirty;
  }

  processImage(event: any) {
    var input = event.target.files;
    var file = input[0];
    var reader = new FileReader();
    let addForm = this.addProductForm;
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", function() {
      addForm.addControl('imgsrc', new FormControl(reader.result as string));
    });
  }

  showImage(base64) {
    console.log(base64);
  }

  addSpecification() {
    this.next = this.next + 1;
    let specName = (<HTMLInputElement>document.getElementById("specificationName")).value;
    let specValue = (<HTMLInputElement>document.getElementById("specificationValue")).value;

    var div = document.createElement('div');
    div.setAttribute("class", "form-group form-inline");

    var a = document.createElement('label');
    a.innerHTML = specName;
    a.setAttribute("for", specName);
    a.setAttribute("id", "label"+this.next);

    var b = document.createElement('input');
    b.setAttribute("type", "text");
    b.value = specValue;
    b.setAttribute("class", "form-control");
    b.setAttribute("id", specName);
    b.setAttribute("style", "margin-left: auto; margin-top: 5px;");
    b.setAttribute("formControlName", specName);
    // b.disabled = true;

    div.appendChild(a);
    div.appendChild(b);
    document.getElementById('form').appendChild(div);
    const control = new FormControl(specValue, {updateOn: 'change'});
    this.addProductForm.addControl(specName, control);
    // this.addProductForm.addControl(specName, this.formBuilder.control({value: specValue, disabled: false}));
  }

  addProduct() {
    let formObject = this.addProductForm.getRawValue();
    let serializedForm = JSON.stringify(formObject);
    this.productService.addProduct(serializedForm).subscribe(
      () => alert('Data saved successfully'),
      error => console.log('error while posting data to server', error)
    );
  }

}

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';

@Injectable({
  providedIn: 'root'
})
export class ExitGuardService implements CanDeactivate<AddProductComponent> {

  canDeactivate(component: AddProductComponent): boolean {
    if(component.isDirty()) {
      return window.confirm('You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    }
    else {
      return true;
    }
  }
}

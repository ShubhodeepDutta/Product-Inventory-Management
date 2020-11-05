import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ExitGuardService } from './service/exit-guard.service';
import { TopProductComponent } from './top-product/top-product.component';

const routes: Routes = [
  {
    path: 'loginpage', component: LoginComponent
  },
  {
    path: 'registerpage', component: RegisterComponent
  },
  {
    path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuardService], canDeactivate: [ExitGuardService]
  },
  {
    path: 'topProducts', component: TopProductComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: '', component: ProductsComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

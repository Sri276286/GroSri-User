import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GroHomePage } from './gro/home/home.page';
import { StorePage } from './gro/store/store.page';
import { CartPage } from './gro/cart/cart.page';
import { ProfilePage } from './gro/profile/profile.page';
import { LoginPage } from './gro/login/login.page';
import { SignupPage } from './gro/signup/signup.page';

const routes: Routes = [
  { path: 'home', component: GroHomePage },
  { path: 'store/:id', component: StorePage },
  { path: 'cart', component: CartPage },
  { path: 'profile', component: ProfilePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: SignupPage },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GroHomePage } from './gro/home/home.page';
import { StorePage } from './gro/store/store.page';
import { CartPage } from './gro/cart/cart.page';
import { ProfilePage } from './gro/profile/profile.page';
import { LoginPage } from './gro/login/login.page';
import { SignupPage } from './gro/signup/signup.page';
import { OrderListPage } from './gro/order-list/order-list.page';
import { OrderDetailsPage } from './gro/order-list/order-details/order-details.page';
import { AuthGuard } from './common/guards/auth.guard';
import { TabsPage } from './gro/tabs/tabs.page';
import { PageNotFoundPage } from './gro/page-not-found/page-not-found.page';

// import { AppResolver } from './common/resolvers/app.resolver';

const routes: Routes = [
  { path: 'store/:id', component: StorePage },
  { path: 'orders', component: OrderListPage, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderDetailsPage, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPage },
  { path: 'register', component: SignupPage },
  {
    path: 'user', component: TabsPage,
    children: [
      { path: 'home', component: GroHomePage },
      { path: 'cart', component: CartPage },
      { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: PageNotFoundPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

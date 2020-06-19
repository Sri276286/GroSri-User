import { NgModule } from '@angular/core';
import { GroHomePage } from './home/home.page';
import { CategoryPage } from './home/category/category.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StoreListPage } from './store-list/store-list.page';
import { OfferSlidePage } from './home/offer-slides/offer-slide.page';
import { ReferPage } from './refer/refer.page';
import { StorePage } from './store/store.page';
import { ProductListPage } from './store/product-list/product-list.page';
import { ProductSearchPage } from './store/product-search/product-search.component';
import { ItemWeightsPage } from './store/item-weights/item-weights.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartPage } from './cart/cart.page';
import { CartBarPage } from './cart/cart-bar/cart-bar.page';
import { CartCheckoutPage } from './cart/cart-checkout/cart-checkout.page';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { OrderListPage } from './order-list/order-list.page';
import { ProfilePage } from './profile/profile.page';
import { OrderDetailsPage } from './order-list/order-details/order-details.page';
import { MenuButtonPage } from './store/menu-button/menu-button.page';
import { MenuPopoverPage } from './store/menu-button/menu-popover/menu-popover.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        GroHomePage,
        LoginPage,
        SignupPage,
        CategoryPage,
        StoreListPage,
        OfferSlidePage,
        ReferPage,
        StorePage,
        ProductListPage,
        ProductSearchPage,
        ItemWeightsPage,
        CartPage,
        CartBarPage,
        CartCheckoutPage,
        ProfilePage,
        OrderListPage,
        OrderDetailsPage,
        MenuButtonPage,
        MenuPopoverPage
    ]
})
export class GroModule {

}
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
import { LocationModalPage } from './home/location/location.page';
import { UserModalPage } from './profile/user-modal/user-modal.page';
import { AddressBookPage } from './profile/address-book/address-book.page';
import { AddressPage } from './profile/address-book/address/address.page';
import { LinePage } from './line/line.page';
import { CategoryFullPage } from './home/category/category-full/category-full.page';
import { MenuPage } from './home/menu/menu.page';
import { CategoryStorePage } from './home/category/category-stores/category-store.page';
import { HomeContentPage } from './home/home-content/home-content.page';
import { ErrorPage } from './error/error.page';
import { DeliveryPage } from './cart/delivery/delivery.page';
import { RecentOrderPage } from './home/recent-order/recent-order.page';
import { TabsPage } from './tabs/tabs.page';
import { PageNotFoundPage } from './page-not-found/page-not-found.page';
import { TrackOrderPage } from './order-list/track-order/track-order.page';
import { HeaderPage } from './header/header.page';
import { DashboardHeadingDirective } from '../common/directives/dashboard-heading.directive';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TabsPage,
        GroHomePage,
        HomeContentPage,
        HeaderPage,
        LoginPage,
        SignupPage,
        CategoryPage,
        CategoryFullPage,
        CategoryStorePage,
        StoreListPage,
        OfferSlidePage,
        ReferPage,
        StorePage,
        ProductListPage,
        ProductSearchPage,
        CartPage,
        CartBarPage,
        CartCheckoutPage,
        ProfilePage,
        OrderListPage,
        OrderDetailsPage,
        RecentOrderPage,
        MenuPage,
        MenuButtonPage,
        MenuPopoverPage,
        LocationModalPage,
        UserModalPage,
        AddressBookPage,
        AddressPage,
        DeliveryPage,
        LinePage,
        TrackOrderPage,
        ErrorPage,
        PageNotFoundPage,
        DashboardHeadingDirective
    ]
})
export class GroModule {

}
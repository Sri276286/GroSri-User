import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreItemsService } from 'src/app/common/services/store-items.service';
import { StoreService } from 'src/app/common/services/store.service';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
  templateUrl: './store.page.html'
})
export class StorePage implements OnInit {
  items = [];
  categories = [];
  storeProductCatalog;
  toggle = {
    last_step: 0,
    current_step: 0,
    expand: true,
    collapse: false
  };
  toggleMap = new Map();
  public categoryIndex: number = 0;
  public storeName: string = '';
  public isFavoriteStore: boolean = false;
  public isLoggedIn: boolean = false;;

  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn = this._loginService.isLogin();
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._subscriptions.push(
        this._storeItemsService.getItems(id)
          .subscribe((store: any) => {
            console.log('store ', store);
            if (store.store) {
              this.storeName = store.store.storeName;
              this.isFavoriteStore = store.store.mark_favorite ? true : false;
            }
            if (store.productsByCategory) {
              this.categories = this._storeItemsService.categories;
              this.categories = this.categories.map((t, index) => {
                return {
                  id: index,
                  name: t
                }
              })
              const category = this.categories[0];
              this.getProductsWithCategory(category);
            }
          }, () => {
          })
      );
    })
  }

  toggleCategory(step) {
    const canToggle = this.toggleMap.get(step);
    if (canToggle) {
      this.toggleMap.set(step, false);
    } else {
      this.toggleMap.set(step, true);
    }
  }

  getProductsWithCategory(category) {
    this.categoryIndex = category.id;
    this._storeItemsService.getProductsWithCategory(category.name).subscribe((entity) => {
      this.storeProductCatalog = entity;
      this.toggleMap.set(0, true);
    });
  }

  makeFavorite() {
    const id = this._route.snapshot.params.id;
    let favorite = {
      storeId: id,
      mark_favorite: (this.isFavoriteStore ? 0 : 1)
    }
    this._storeService.markFavorite(favorite).subscribe(() => {
      this.isFavoriteStore = !this.isFavoriteStore;
    });
  }

}

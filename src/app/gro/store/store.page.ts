import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreItemsService } from 'src/app/common/services/store-items.service';
import { StoreService } from 'src/app/common/services/store.service';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
  templateUrl: 'store.page.html',
  styleUrls: ['./store.page.scss']
})
export class StorePage implements OnInit {
  categories = [];
  storeCatalog;
  public storeEntity;
  public isFavoriteStore: boolean = false;
  public isLoggedIn: boolean = false;;

  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.scrollViewWithMenu();
    this.isLoggedIn = this._loginService.isLogin();
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._subscriptions.push(
        this._storeItemsService.getItems(id)
          .subscribe((store: any) => {
            console.log('store ', store);
            if (store.store) {
              this.storeEntity = store.store;
              this.isFavoriteStore = store.store.mark_favorite ? true : false;
            }
            if (store.productsByCategory) {
              this.storeCatalog = store.productsByCategory;
              this.categories = this._storeItemsService.categories;
            }
          })
      );
    })
  }

  /**
   * Scrolls based on menu selection
   */
  scrollViewWithMenu() {
    this._storeService.categorySelected$.subscribe((category) => {
      const spanTags = document.querySelectorAll('#categ-span');
      let matchingEl;
      spanTags.forEach((tag: any) => {
        console.log(tag.innerText);
        if (tag.innerText === category)
          matchingEl = tag;
      });
      if (matchingEl) {
        matchingEl.scrollIntoView();
      }
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

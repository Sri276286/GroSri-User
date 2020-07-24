import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreItemsService } from 'src/app/common/services/store-items.service';
import { StoreService } from 'src/app/common/services/store.service';
import { CommonService } from 'src/app/common/services/common.service';
import { ProductSearchPage } from './product-search/product-search.component';

@Component({
  templateUrl: 'store.page.html',
  styleUrls: ['./store.page.scss']
})
export class StorePage implements OnInit {
  storeCatalog;
  public storeEntity;
  public isFavoriteStore: boolean = false;
  public isLoggedIn: boolean = false;
  public isStoreEmpty: boolean = false;
  @ViewChild('scrollContent') el: ElementRef;
  public scrolled: boolean = false;

  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _commonService: CommonService) {
  }

  // @HostListener('document:scroll', []) onScroll() {
  //   console.log('on scroll');
  // }

  ngOnInit() {
    this.scrollViewWithMenu();
    this._commonService.presentLoading('Store is loading. Please wait...');
    this.isLoggedIn = this._commonService.isLogin();
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._subscriptions.push(
        this._storeItemsService.getItems(id)
          .subscribe((store: any) => {
            if (store.store) {
              this.storeEntity = store.store;
              this.isFavoriteStore = store.store.mark_favorite ? true : false;
            }
            if (store.productsByCategory) {
              this.isStoreEmpty = false;
              this.storeCatalog = store.productsByCategory;
              console.log('store catalog ', this.storeCatalog);
            } else {
              this.isStoreEmpty = true;
            }
          }, () => {
            this.isStoreEmpty = true;
          })
      );
    })
  }

  /**
   * Scrolls based on menu selection
   */
  scrollViewWithMenu() {
    this._storeService.categorySelected$.subscribe((entity) => {
      const spanTags = document.querySelectorAll('#categ-span');
      let matchingEl;
      spanTags.forEach((tag: any) => {
        if (tag.innerText === entity.name)
          matchingEl = tag;
      });
      if (matchingEl) {
        matchingEl.scrollIntoView();
      }
    });
  }

  /**
   * Handle scroll
   * @param event
   */
  onScroll(event: Event) {
    if (event && event.srcElement) {
      if (this.el.nativeElement.scrollTop > 20) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
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

  /**
   * Loads product search modal
   */
  productSearchModal() {
    this._commonService.presentModal(ProductSearchPage);
  }

}

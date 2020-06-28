import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  defaultLocation: string = '600116';
  canProceedUpdatingCart: boolean = false;
  proceedUpdatingCart$: Subject<boolean> = new Subject<boolean>();
  ordersPlaced = [];
  storesListed = [];
  setUserLocation$: BehaviorSubject<string> = new BehaviorSubject<string>('600116');
  orderPlaced$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
  }

  handleUserStorage(property: string, value: any) {
    const profile = JSON.parse(localStorage.getItem('currentUser'));
    profile[property] = value;
    localStorage.setItem('currentUser', JSON.stringify(profile));
  }

  public getUserLocation() {
    return this.setUserLocation$.asObservable();
  }


  public isLogin() {
    const auth_token = localStorage.getItem('auth_token');
    const session_active = localStorage.getItem('session_active');
    return auth_token && session_active ? true : false;
  }

  async presentModal(component, properties?: any) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: properties
    });
    return await modal.present();
  }

  async presentToast(message: string, position?: "top" | "bottom" | "middle") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: position
    });
    toast.present();
  }

  public dismissAllModals() {
    this.modalCtrl.dismiss().then(() => {
      this.modalCtrl.getTop()
        .then((res) => {
          this.dismissAllModals();
        })
        .catch((error) => {
        });
    });
  }

  checkForSession(): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(true);
      }, 10 * 60 * 1000);
    });
  }

  getStoreDetailsFromId(id: string) {
    return this.storesListed.find(t => t.id === +id);
  }

  getOrderDetailsFromId(id: string) {
    return this.ordersPlaced.find(t => t.orderId === id);
  }

}


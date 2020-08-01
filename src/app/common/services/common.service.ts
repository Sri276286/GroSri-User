import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { UserAddress } from '../../common/models/user-address.model';
import {
  ModalController,
  ToastController,
  LoadingController,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  defaultLocation: string = "600116";
  ordersPlaced = [];
  storesListed = [];
  setUserLocation$: BehaviorSubject<string> = new BehaviorSubject<string>(
    "600116"
  );
  repeatOrder$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  orderPlaced$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  addressSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fromDeliveryPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  addressSelected$: BehaviorSubject<UserAddress> = new BehaviorSubject<UserAddress>(null);

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  handleUserStorage(property: string, value: any) {
    const profile = JSON.parse(localStorage.getItem("currentUser"));
    profile[property] = value;
    localStorage.setItem("currentUser", JSON.stringify(profile));
  }

  public getUserLocation() {
    return this.setUserLocation$.asObservable();
  }

  public isLogin() {
    const auth_token = localStorage.getItem("auth_token");
    const session_active = localStorage.getItem("session_active");
    return auth_token && session_active ? true : false;
  }

  async presentModal(component, properties?: any) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: properties,
    });
    return await modal.present();
  }

  async presentToast(message: string, position?: "top" | "bottom" | "middle") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: position,
    });
    toast.present();
  }

  async presentLoading(message) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: 2500,
      spinner: "circles", // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  public dismissAllModals() {
    this.modalCtrl.dismiss().then(() => {
      this.modalCtrl
        .getTop()
        .then((res) => {
          this.dismissAllModals();
        })
        .catch((error) => { });
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
    return this.storesListed.find((t) => t.id === +id);
  }

  getOrderDetailsFromId(id: string) {
    return this.ordersPlaced.find((t) => t.orderId === id);
  }

  public getDisplayDate(date): string {
    let d = new Date(date);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[d.getDay()] + ", " + this.formatDate(d);
  }

  private formatDate(d) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear();
  }
  private formatAMPM(d) {
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
}

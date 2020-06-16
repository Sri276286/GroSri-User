export class ApiConfig1 {
  static loginURL: string = '/api/login'; // POST
  static signupURL: string = '/api/signup'; // POST
  static storeListURL: string = '/api/store'; // GET
  static storeListByCategoryURL: string = '/api/category'; // GET
  static storeProductsURL: string = '/api/items-list'; // GET
  static userDetailsURL: string = '/api/user'; // GET, POST
  static cartURL: string = '/api/cart'; // GET, POST
  static orderURL: string = '/api/order'; // GET, POST
  static ordersListURL: string = '/api/orders'; // GET
  static favoriteStoreURL: string = '/api/store/favorite'; // POST, GET
}

export class ApiConfig {
  static apiHostUrl: string = "http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com"
  static loginURL: string = `${ApiConfig.apiHostUrl}/auth/login`; // POST
  static signupURL: string = `${ApiConfig.apiHostUrl}/auth/signup`; // POST
  static logoutURL: string = `${ApiConfig.apiHostUrl}/auth/logout`; // GET
  // List stores by pincode and category
  static storeListURL: string = `${ApiConfig.apiHostUrl}/stores/findStoresByPincode`; // GET
  // static storeListURL: string = `/api/store`; // GET
  static storeProductsURL: string = `${ApiConfig.apiHostUrl}/stores/findProductsByStoreId`; // GET
  // static storeProductsURL: string = `/api/items-list`; // GET
  static userDetailsURL: string = `${ApiConfig.apiHostUrl}/user/me`; // GET, POST
  static userUpdateURL: string = `${ApiConfig.apiHostUrl}/user/update`; // POST
  static userAddressListURL: string = `${ApiConfig.apiHostUrl}/user/address/list`; // GET
  static userAddressAddURL: string = `${ApiConfig.apiHostUrl}/user/address/save`; // POST
  static userAddressUpdateURL: string = `${ApiConfig.apiHostUrl}/user/address/update`; // POST
  static cartUpdateURL: string = `${ApiConfig.apiHostUrl}/orderProducts/upsert`; // PUT
  static cartUpdateBulkURL: string = `${ApiConfig.apiHostUrl}/orderProducts/upsertbulk`; // PUT
  // Get each order
  static orderURL: string = `${ApiConfig.apiHostUrl}/orders`; // GET, POST
  static ordersListURL: string = `${ApiConfig.apiHostUrl}/orders/customers`; // GET
  static favoriteStoreURL: string = `${ApiConfig.apiHostUrl}/api/store/favorite`; // POST, GET
  static placeOrderURL: string = `${ApiConfig.apiHostUrl}/orders/customers/update`; // PUT
  // Used for getting cart details, order details based on order status
  static commonCartAndOrderURL: string = `${ApiConfig.apiHostUrl}/orders/customers/orderStatus`;
}


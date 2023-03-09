import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class AppHttpService {



  httpOptions: any;
  user: any;
  sendFromHome: any;
  products: any;
  constructor(private myClient: HttpClient, private local: LocalStorageService) {
    this.token = this.local.get('token');
    this.user = this.local.get('user');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.getToken()}` // Here is the token
      })


    };


  }
  private BaseURLGetCustomer = "https://kotopedia-backend.onrender.com/customer";
  private BaseURLAddFeedBack = "https://kotopedia-backend.onrender.com/customer/feedbacks";
  private BaseURLAddCustomer = "https://kotopedia-backend.onrender.com/customer/signup";
  private BaseURLGetProductByCat = "https://kotopedia-backend.onrender.com/customer/products";
  private BaseURLaddToCart = "https://kotopedia-backend.onrender.com/customer/cart";

  private token: any;
  BaseURLGetProduct: any;





  //Methods
  //1 get all users
  getAllCustomers() {
    return this.myClient.get(this.BaseURLGetCustomer);
  }

  //2 get all products
  setProduct(x: any) {
    this.local.set('cat', x);
    this.products = x;
  }
  getProduct() {
    this.products = this.local.get('cat');
    return this.products;
  }

  getAllProducts() {
    this.BaseURLGetProduct = `https://kotopedia-backend.onrender.com/customer/products/${this.user._id}`;
    return this.myClient.get(this.BaseURLGetProduct, this.httpOptions);
  }

  //3
  addNewUser(newUser: any) {
    this.myClient.post(this.BaseURLAddCustomer, newUser);
  }

  //get user info on login
  getUserInfo() {
    return this.myClient.get(`${this.BaseURLGetCustomer}/profile/${this.user._id}`, this.httpOptions)
  }

  //update user data
  updateUserData(userData: object, headers: any) {
    return this.myClient.patch(this.BaseURLGetCustomer + '/profile', userData, { headers });
  }

  //add feedback
  addFeedback(feed: any) {
    return this.myClient.post(this.BaseURLAddFeedBack, feed);
  }

  //add to cart
  addtoCart(userID: any, bookID: any, headers: any) {
    return this.myClient.post(`${this.BaseURLGetCustomer}/cart`, { userID, bookID }, { headers })
  }

  //get user cart
  getCart(headers: any) {
    return this.myClient.get(`${this.BaseURLGetCustomer}/cart/${this.user._id}`, { headers });
  }

  // update quatity of cart product
  updateProductQuatity(userID: string, title: string, quantity: any, headers: any) {
    return this.myClient.patch(`${this.BaseURLGetCustomer}/cart`, { userID, title, quantity }, { headers });
  }

  //add cart to orders
  addCartToOrders(userID: string, headers: any) {
    return this.myClient.post(`${this.BaseURLGetCustomer}/orders`, { userID }, { headers })
  }

  //order one item
  addtoOrders(userID: string, bookID: string, headers: any) {
    return this.myClient.post(`${this.BaseURLGetCustomer}/orders`, { userID, bookID }, { headers })
  }

  // get all user orders
  getAllOrders(headers: any) {
    return this.myClient.get(`${this.BaseURLGetCustomer}/orders/${this.user._id}`, { headers });
  }

  //Empty cart
  emptyCart(headers: any) {
    return this.myClient.delete(`${this.BaseURLGetCustomer}/cart/${this.user._id}`, { headers });
  }


  //cancel order
  cancelOrder(orderID: any, headers: any) {
    return this.myClient.delete(`${this.BaseURLGetCustomer}/orders/${this.user._id}/${orderID}`, { headers })
  }

  //local storage token and user
  //set token and user come only from log in page
  setToken(x: any) {
    this.local.set('token', x);
    this.token = this.local.get('token');
  }

  getToken() {
    return this.token;
  }
  removeToken() {
    this.local.set('token', null);
  }
  setUser(x: any) {
    this.local.set('user', x);
    this.user = this.local.get('user');
  }
  getUser() {
    return this.user;
  }
  getProductsByCategory(category: any) {       //Done
    return this.myClient.get(this.BaseURLGetProductByCat + `/${category}/${this.user._id}`, this.httpOptions);
  }


  setSend() {
    return this.local.get('sentData');
  }

  getFeedBacks(x: any) {
    return this.myClient.get(this.BaseURLAddFeedBack + `/${x}`);

  }

  //add to cart abanoub
  addToCart(body: any) {
    return this.myClient.post(this.BaseURLaddToCart, body, this.httpOptions);
  }

  //remove from cart by book title
  removefromCart(title: any) {
    return this.myClient.delete(this.BaseURLaddToCart + `/${this.user._id}/${title}`, this.httpOptions);

  }
  getAllfromCart(headers: any) {
    return this.myClient.get(this.BaseURLaddToCart + `/${this.user._id}`, { headers });

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendUserDataService {

  constructor(private myClient : HttpClient) { }

  private baseURL = "https://kotopedia-backend.onrender.com/customer";

  sendLoginData(userInfo:object){
    return this.myClient.post(this.baseURL+'/login',userInfo);
  }

  sendSignupData(userData:any){
    return this.myClient.post(this.baseURL+'/signup',userData);
  }

  getUserData(userId:any){
    return this.myClient.get(this.baseURL+`/${userId}`);
  }

  sendUserData(userData:any){
    return this.myClient.post(this.baseURL,userData)
  }

}

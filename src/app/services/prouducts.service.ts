import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProuductsService {
    private Allproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];
    private cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];


  constructor() {
    this.Allproducts= [
      { "src": "../../../../assets/img2.jpg", "name": "Change for the better","category" :"romantic","unitPrice":100},
      { "src": "../../../../assets/img3.jpg", "name": "Rich Dad Poor Dad","category" :"Fantasy","unitPrice":150},
      { "src": "../../../../assets/img4.jpg", "name": "Attomic Habits","category" :"Kids","unitPrice":120},
      { "src": "../../../../assets/img5.jpg", "name": "The Richest Man in Babylon","category" :"Horror","unitPrice":85},
      { "src": "../../../../assets/img6.jpg", "name": "Lojain","category" :"history","unitPrice":90},
      { "src": "../../../../assets/mark_manson.jpg", "name": "The Art of Not Giving a interest","category" :"Crime","unitPrice":70}
    ];
  }
getAllProducts(){
  return this.Allproducts;
}
getCartProducts(){
  return this.cartproducts;
}
setCartProducts(x:any){
this.cartproducts.push(x);
}
RemoveFromCart(x:number){
this.cartproducts.splice(x,1);
}


}

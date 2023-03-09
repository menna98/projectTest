import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  cartproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];



 @Input() getData(x:any){
  this.cartproducts=x;
  console.log(this.cartproducts);

 }

}
function output() {
  throw new Error('Function not implemented.');
}

function getData() {
  throw new Error('Function not implemented.');
}


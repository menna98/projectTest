import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  p: number = 1;
  itemperpage: number = 12;
  totalitems: any;

  Allproducts: { src: string, category: string }[] =
    [
      { "src": "../../../../assets/img9.jfif", "category": "romantic" },
      { "src": "../../../../assets/img10.jfif", "category": "fantasy" },
      { "src": "../../../../assets/img11.jfif", "category": "children" },
      { "src": "../../../../assets/img20.jfif", "category": "business" },
      { "src": "../../../../assets/home_images/hist.jpg", "category": "history" },
      { "src": "../../../../assets/img19.jfif", "category": "crime" }
    ];
  CartButton: string[] = [];
  seachItem: string = "";
  indicator: boolean[] = [];
  i: number = 0;
  cat: boolean = true;
  searchValue: string = '';
  z: any;
  user: any;
  FeedBackBody: any;
  modalIdentifier: any;
  feedBacks: any;
  cartBody: any;
  userID: any;
  ProductID: any;
  Products: any;
  headers: any;
  product: any;
  Cart: any;
  userCart: any;
  titles: string[] = [];
  numberOfItems: any;
  // move it to allproducts page

  constructor(public myService: AppHttpService, private local: LocalStorageService, private router: Router) {
    this.headers = {
      authorization: this.local.get('token')
    }
    this.user = this.myService.getUser();
    this.userID = this.user._id;
  }

  toProductByCategory(x: any) {
    console.log(this.Allproducts[x].category);

    this.myService.getProductsByCategory(this.Allproducts[x].category).subscribe({
      next: res => {
        this.myService.setProduct(res);
        this.totalitems=this.Products.length;
        window.location.reload();
      },
      error: err => { console.log(err); }
    })
  }


  loader=true;
  ngOnInit(): void {

    setTimeout(() => {
      this.loader=false;
       }, 2000);


    //here i am going to get all titles in cart so determine if add to cart or remove
    this.myService.getAllfromCart(this.headers).subscribe({
      next: res => {
        this.Cart = res;
        this.userCart = this.Cart.userCart;
        for (var i = 0; i < this.userCart.length; i++) { this.titles.push(this.userCart[i].title) };

        this.myService.getAllProducts().subscribe(
          {
            next: (res) => {

              //console.log(res);
              this.Products = res;
              if (this.myService.getProduct()) { this.Products = this.myService.getProduct(); this.myService.setProduct(null); this.totalitems=this.Products.length;}
              else if (!this.myService.getProduct()) { this.Products = res; this.Products = res;this.totalitems=this.Products.length;}
              for (this.i = 0; this.i < this.Products.length; this.i++) {
                if (this.titles.includes(this.Products[this.i].title)) {
                  this.CartButton.push("Remove");
                  this.indicator.push(false);

                }
                else {
                  this.CartButton.push("Add To Cart");
                  this.indicator.push(true);
                }
              }
              this.numberOfItems = this.Products.length;

            },
            error(err) { console.log(err) }
          })
      },
      error: err => { console.log(err); }
    });
  }


  addToCart(x: number) {
    console.log(this.Products[x]);
    if (this.indicator[x]) {
      this.CartButton[x] = "Remove";
      this.cartBody = { userID: this.user._id, bookID: this.Products[x]._id };
      this.myService.addtoCart(this.userID, this.Products[x]._id, this.headers).subscribe(
        {
          next: res => {
            //console.log(res);
          }, error: err => {
            console.log(err);

          }
        }
      );
    }
    else {
      this.CartButton[x] = "Add To Cart";
      this.myService.removefromCart(this.Products[x].title).subscribe({
        next: (res) => {
          //console.log(res);
        },
        error: (err) => {
          console.log(err);

        }
      });
    }
    this.indicator[x] = !this.indicator[x];
    this.local.set('CartButton', this.CartButton);
  }

  getProductD(product: any) {
    console.log(product);
    this.ProductID = product._id;
    console.log(this.ProductID)
    console.log(this.userID);
    this.myService.addtoCart(this.userID, this.ProductID, this.headers).subscribe(
      {
        next: res => {
          //console.log(res);
        }, error: err => {
          console.log(err);

        }
      }
    )
  }

  BuyNow(prod: any) {
    //console.log(prod);
    this.ProductID = prod._id;
    this.myService.addtoOrders(this.userID, this.ProductID, this.headers).subscribe({
      next: res => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your order is submitted,Once it is accepted ,the shipping company will contact you ',
          showConfirmButton: false,
          timer: 3000
        })
      }, error: err => {
        console.log(err);
      }
    })
  }


  search(x: any) {
    console.log(x);
  }


  addFeedBack(title: any, fb: any) {

    this.FeedBackBody = { title, email: this.user.email, body: fb };
    this.myService.addFeedback(this.FeedBackBody).subscribe();
    this.router.navigate(['/products']);
  }

  setModalIdentifier(x: any) {
    this.modalIdentifier = x;
    //console.log(this.modalIdentifier);
  }

  modalFilter(x: number) {
    return this.modalIdentifier == x;
  }

  getFeedBacks(x: any) {
    this.myService.getFeedBacks(x).subscribe({
      next: (res) => {
        this.feedBacks = res;
        //console.log(res);
      },
      error(err) { console.log(err) }
    })
  }

  //////////////////////////////////////
  setNumberofitems(x: any) {
    this.numberOfItems = x;
    //console.log(this.numberOfItems);
  }

}

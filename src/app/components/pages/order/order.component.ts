import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  user:any;
  userID:any;
  headers:any;
  ordersArr:any;

  constructor(private myService:AppHttpService,private local: LocalStorageService){
    this.headers = {
      authorization:this.local.get('token')
    }
    this.myService.getUserInfo().subscribe(
      {
        next:(res)=>{
          //console.log(res)
          this.user=res;
        },
        error(err){console.log(err)}
      }
    )
  }

  ngOnInit(): void {
    this.myService.getAllOrders(this.headers).subscribe({
      next:(res)=>{
        //console.log(res)
        this.ordersArr=res;
      },
      error(err){console.log(err)}
    })
  }


  cancelOrder(orderID:any){
    //console.log(orderID);

    this.myService.cancelOrder(orderID,this.headers).subscribe({
      next:res=>{
        //console.log(res);
        this.ngOnInit();
      },error:err=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not cancel an order after being accepted or rejected',
        })
      }
    })
  }

  checkorder(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your order is submitted,Once it is accepted we will inform you to contact delivery ',
      showConfirmButton: false,
      timer: 2000
    })
  }

}


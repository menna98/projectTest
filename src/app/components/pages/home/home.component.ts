import { Component, EventEmitter, Output } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    Allproducts: { src: string ,category:string}[] =
    [
    { "src": "../../../../assets/img9.jpg","category" :"romantic"},
    { "src": "../../../../assets/img10.jpg","category" :"fantasy"},
    { "src": "../../../../assets/img11.PNG","category" :"children"},
    { "src": "../../../../assets/img20.jpg","category" :"business"},
    { "src": "../../../../assets/img88.PNG","category" :"history"},
    { "src": "../../../../assets/img19.jpg","category" :"crime"}
];
@Output()  MyEvent=new EventEmitter();
token:any;
user:any;
navigate:boolean=false;

constructor(private mysrv:SendUserDataService,private myService:AppHttpService,private router: Router,private local: LocalStorageService) {

  this.token=this.myService.getToken();
  this.user=this.myService.getUser();

  if(this.local.get('fs')){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Sign in successfully'
    })
    this.local.set('fs',false);

  }

}

toProductByCategory(x:any){
  console.log(this.Allproducts[x].category);
  if(this.token){
  this.myService.getProductsByCategory(this.Allproducts[x].category).subscribe({
next:res=>{
  //console.log(res) ;
  this.myService.setProduct(res) ;
  this.router.navigate(['/products']);
},
error:err=>{console.log(err);}
    })

  }
  else{
    Swal.fire({
      title: 'You need to Login to get access',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}

}


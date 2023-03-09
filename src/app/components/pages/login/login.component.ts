import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import { LocalStorageService } from 'angular-web-storage';
import { Location } from '@angular/common';
import { AppHttpService } from 'src/app/services/app-http.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  constructor(

    private myServ: SendUserDataService,
    private local: LocalStorageService,
    private myService: AppHttpService,
    private router: Router) {
    if (local.get('sessionOut')) {
      console.log("end !");
      Swal.fire({
        title: 'User session expired !!',
        text: 'You have been logged out please log in again !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      })
      local.set('sessionOut', false);

    }


  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))])
  })

  get emailValid() {
    return !this.loginForm.controls.email.value ? 'You must enter a value'
      : !this.loginForm.controls['email'].valid ? 'Invalid email format' : '';
  }

  get passwordValid() {
    return !this.loginForm.controls['password'].value ? 'You must enter a value'
      : !this.loginForm.controls['password'].valid ? 'Invalid password format, password should be 8 - 16 (lowercase or uppercase) characters or digits' : '';
  }

  currentUser: any;
  x: any;
  y: any;

  sendUserData() {
    this.myServ.sendLoginData({ email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value }).subscribe({
      next: res => {
        this.currentUser = res;
        if (this.currentUser.user.role === "admin") {
          document.cookie = `token=${this.currentUser.token}`;
          setTimeout(function () {
            window.location.href = "http://localhost:4202/";
          }, 2000)
        }
        else {
          this.local.set('fs',true);
          this.myService.setUser(this.currentUser.user);
          this.myService.setToken(this.currentUser.token);
            window.location.href = "/home";
        }

      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        })
        this.loginForm.reset();
      },
    })
  }
}

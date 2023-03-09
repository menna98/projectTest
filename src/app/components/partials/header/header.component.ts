import { Component, OnChanges, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit,OnChanges {
  token: any;
  user: any;

  constructor(private myService: AppHttpService, private local: LocalStorageService) {
    this.token = this.myService.getToken();
    this.user = this.myService.getUser();

    if (this.token && this.user.role === "customer"){
      setTimeout(function() {
        myService.removeToken();
        window.location.href = "/registeration";
        local.set('sessionOut',true);
      }, 600000  /* 30*60*1000 */);
    }
  }

  ngOnInit() : void {
    this.myService.getUserInfo().subscribe(
      {
        next: (res) => {
          console.log(res)
          this.user = res;
        },
        error(err) { console.log(err) }
      }
    )
  }

  ngOnChanges() {
    this.token = this.myService.getToken();     // Update token value here when it changes from its source

  }

  logout() {
    this.myService.removeToken();
    window.location.href = "/home";
  }

}

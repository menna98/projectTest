import { Component } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private myService:AppHttpService){

  }

}


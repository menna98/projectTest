import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from "./components/partials/footer/footer.component";
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { RegisterationComponent } from './components/pages/registeration/registeration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { PayementComponent } from './components/pages/payement/payement.component';
import { CommonModule } from '@angular/common'
import { CartComponent } from './components/pages/cart/cart.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatIconModule} from '@angular/material/icon';
import { OrderComponent } from './components/pages/order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RegisterationComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    PayementComponent,
    CartComponent,
    AboutComponent,
    ProfileComponent,
    OrderComponent,
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],

  providers: [
    //service
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})


export class AppModule { }

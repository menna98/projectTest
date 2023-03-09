
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppHttpService } from 'src/app/services/app-http.service';
import { HttpClient } from '@angular/common/http';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  genders: any[] = [{ value: 'Male' }, { value: 'Female' }];

  hide = true;

  constructor(private formBulider: FormBuilder, public myService: AppHttpService, private http: HttpClient, private myServ: SendUserDataService) {
    this.signupForm = this.formBulider.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))]],
      gender: ['', Validators.required],
      photo: [[]],
    })
  }

  get nameNotValid() {
    return !this.signupForm.controls['name'].value ? 'You must enter a value'
      : !this.signupForm.controls['name'].valid ? 'Invalid name format, name should be 3 - 15 characters' : '';
  }

  get emailNotValid() {
    return !this.signupForm.controls['email'].value ? 'You must enter a value'
      : !this.signupForm.controls['email'].valid ? 'Invalid email format' : '';
  }

  get passwordNotValid() {
    return !this.signupForm.controls['password'].value ? 'You must enter a value'
      : !this.signupForm.controls['password'].valid ? 'Invalid password format, password should be 8 - 16 (lowercase or uppercase) characters or digits' : '';
  }

  selectedFile: File | any = null;

  getPhoto(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  signUp() {
    if (this.signupForm.valid) {
      try {
        const fd = new FormData();
        fd.append('name', this.signupForm.get('name')?.value);
        fd.append('email', this.signupForm.get('email')?.value);
        fd.append('password', this.signupForm.get('password')?.value);
        fd.append('gender', this.signupForm.get('gender')?.value);
        if (this.selectedFile) {
          fd.append('photo', this.selectedFile, this.selectedFile.name);
          this.selectedFile = null;
        }

        console.log(fd)
        this.myServ.sendSignupData(fd).subscribe({
          next: res => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'signed up successfully',
              text: 'Please login to continue',
              timer: 2000
            })
            setTimeout(function(){ location.reload(); },2000)
          }, error: err => {
            console.log(err);
          }
        })
      } catch (error) {
        console.log(error);
      }

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Data Entered!',
        timer: 2000
      })
    }
  }
}

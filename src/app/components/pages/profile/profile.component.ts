import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  token: any;
  user: any;
  userID: any;
  headers: any;
  userImage: any;

  UpdatingForm: FormGroup;

  gender: any[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' }
  ];

  constructor(private myService: AppHttpService, private formBulider: FormBuilder, private local: LocalStorageService) {

    this.headers = {
      authorization: this.local.get('token')
    }
    this.token = this.myService.getToken();
    this.UpdatingForm = this.formBulider.group({
      name: ['', [Validators.maxLength(15), Validators.minLength(3)]],
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender: [''],
      password: ['', [Validators.maxLength(16), Validators.minLength(8)]],
      photo: [],
    })
  }

  ngOnInit(): void {
    this.myService.getUserInfo().subscribe(
      {
        next: (res) => {
          //console.log(res)
          this.user = res;
          this.userImage = this.user.photo;
        },
        error(err) { console.log(err) }

      }
    )

  }

  selectedFile: File | any = null;

  getPhoto(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  get nameNotValid() {
    return !this.UpdatingForm.controls['name'].value ? 'You must enter a value'
      : !this.UpdatingForm.controls['name'].valid ? 'Invalid name format, name should be 3 - 15 characters' : '';
  }

  get emailNotValid() {
    return !this.UpdatingForm.controls['email'].value ? 'You must enter a value'
      : !this.UpdatingForm.controls['email'].valid ? 'Invalid email format' : '';
  }

  get passwordNotValid() {
    return !this.UpdatingForm.controls['password'].valid ? 'Invalid password format, password should be 8 - 16 (lowercase or uppercase) characters or digits' : '';
  }

  updateUserInfo(newUserData:any){
      this.userID = newUserData._id;
      //console.log(this.userID);
      this.UpdatingForm = this.formBulider.group({
      name:[this.user.name,[Validators.maxLength(15),Validators.minLength(3)]],
      email:[this.user.email,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender:[this.user.gender],
      password:['',[Validators.maxLength(16),Validators.minLength(8)]],
      photo:[]
    })
  }

  updateOne(){
    if(this.UpdatingForm.valid){
    try {
      const fd = new FormData();
      fd.append('id', this.userID);
      fd.append('name', this.UpdatingForm.get('name')?.value);
      fd.append('email', this.UpdatingForm.get('email')?.value);
      fd.append('gender', this.UpdatingForm.get('gender')?.value);
      fd.append('password', this.UpdatingForm.get('password')?.value);

      if (this.selectedFile) {
        fd.append('photo', this.selectedFile, this.selectedFile.name);
        this.selectedFile = null;
      }

      this.myService.updateUserData(fd, this.headers).subscribe({
        next: res => {
          //console.log(res);
          this.ngOnInit();
        }, error: err => {
          console.log(err);
        }
      })
      } catch (error) { console.log(error) }
    }else{
      console.log("not valid");
      Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Data Entered',
          })
    }
  }
}

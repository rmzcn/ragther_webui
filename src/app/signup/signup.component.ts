import { Component, OnInit } from '@angular/core';
import { UserRegisterModel } from '../services/BackendServices/API_Models/Post/user_register.model';
import { UserService } from '../services/BackendServices/user.service';
import codes from '../services/BackendServices/response_codes.json'
import { ToastService } from '../toast.service';
import { ToastType } from '../toast.service';
import { Router } from '@angular/router';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userName = "";
  firstName = "";
  lastName = "";
  email = "";
  password = "";

  emailEmpty = false;
  emailAlreadyTaken = false;
  userNameEmpty = false;
  userNameAlreadyTaken = false;
  userNameShort = false;
  firstNameEmpty = false;
  lastNameEmpty = false;
  passwordEmpty = false;
  passwordShort = false;

  apiRetrunCode: string;
  responseCodes:{no:string, name:string}[] = codes;

  public isProgress = false;

  constructor(private userService: UserService, private toastService: ToastService, private router: Router, private stringHelper: StringHelperService) { }

  ngOnInit(): void {
  }

  Register(){
    this.emailEmpty = false;
    this.userNameEmpty = false;
    this.userNameShort = false;
    this.firstNameEmpty = false;
    this.lastNameEmpty = false;
    this.passwordEmpty = false;
    this.passwordShort = false;
    if (this.checkInputs() && !this.isProgress) {
      let model = this.createRegisterModel()
      this.isProgress = true;
      this.userService.Register_Post(model)
        .subscribe(response => {
          this.router.navigate(['/login']);
          this.toastService.writeMessage('success', "Tebrikler baydınız başarı ile gerçekleşti. Ragther'e hoşgeldiniz...",4);
        }, error => {
          this.apiRetrunCode = error.error.error;
          console.log(error.error);
          if (this.stringHelper.Contains(this.apiRetrunCode, "0002")) {
            this.emailAlreadyTaken = true;
          }
          if (this.stringHelper.Contains(this.apiRetrunCode, "0003")) {
            this.userNameAlreadyTaken = true;
          }
          this.isProgress = false;
          this.toastService.writeMessage('danger', "Kaydınız yapılamadı. Lütfen bilgilerinizi kontrol ediniz.",5);
        });
    }
  }


  checkInputs():boolean{
    if(this.stringHelper.isStringNullOrEmpty(this.userName)){
      this.userNameEmpty = true;
    }
    if (this.userName.length<4) {
      this.userNameShort = true;
    }
    if (this.stringHelper.isStringNullOrEmpty(this.firstName)) {
      this.firstNameEmpty = true;
    }
    if (this.stringHelper.isStringNullOrEmpty(this.lastName)) {
      this.lastNameEmpty = true;
    }
    if (this.stringHelper.isStringNullOrEmpty(this.email)) {
      this.emailEmpty = true;
    }
    if (this.password.length<6) {
      this.passwordShort = true;
    }
    if (this.stringHelper.isStringNullOrEmpty(this.password)) {
      this.passwordEmpty = true;
    }

    if (!this.emailEmpty && !this.userNameEmpty && !this.userNameShort && !this.passwordEmpty && !this.passwordShort && !this.firstNameEmpty && !this.lastNameEmpty) {
      return true;
    }
    else return false;
  }

  createRegisterModel(){
    let userRegisterModel = new UserRegisterModel()
    userRegisterModel.Email = this.email;
    userRegisterModel.FirstName = this.firstName;
    userRegisterModel.LastName = this.lastName;
    userRegisterModel.Password = this.password;
    userRegisterModel.UserName = this.userName;

    return userRegisterModel;
  }

}


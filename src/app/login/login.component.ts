import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginModel } from '../services/BackendServices/API_Models/Post/user_login.model';
import { CommentService } from '../services/BackendServices/comment.service';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName : string;
  password : string;
  passwordOrUserNameIncorrect : boolean = false;
  isProgress : boolean = false;


  constructor(private userService: UserService, private toastService: ToastService, private router: Router, private stringHelper: StringHelperService, private session: SessionService) { }

  ngOnInit(): void {

  }

  Login(){
    if (!this.isProgress && this.checkInputs()) {
      this.isProgress = true;
      let userLoginModel : UserLoginModel = {Password : this.password, UserName : this.userName};
      this.userService.Login_Post(userLoginModel).subscribe( (response : {userId:number, userName:string}) => {
        this.session.setSessionID(response.userId.toString());
        this.session.setSessionValue(response.userName);
        this.toastService.writeMessage('success',"Başarıyla giriş yapıldı... Hoşgeldin "+response.userName,3);
        this.router.navigate(['']);
        window.location.assign("http://localhost:4200")
        this.isProgress = true;
      }, error => {
        this.toastService.writeMessage('danger',"Kullanıcı yada şifre hatalı!",3);
        this.passwordOrUserNameIncorrect = true;
        this.isProgress = false;
      });
    }
  }

  checkInputs(){
    if ((this.stringHelper.isStringNullOrEmpty(this.password) || this.password.length < 5)
          &&
        (this.stringHelper.isStringNullOrEmpty(this.userName) || this.userName.length < 3))
    {

      this.toastService.writeMessage('info',"Lütfen gerekli alanları geçerli biçimde doldurun!",3);
      return false
    }
    return true
  }

}

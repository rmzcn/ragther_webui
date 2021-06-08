import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetailModel } from '../services/BackendServices/API_Models/Get/profile_detail.model';
import { MailupdateService } from '../services/BackendServices/mailupdate.service';
import { ProfileupdateService } from '../services/BackendServices/profileupdate.service';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'settings-panel-password',
  templateUrl: './settings-panel-password.component.html',
  styleUrls: ['./settings-panel-password.component.css']
})
export class SettingsPanelPasswordComponent implements OnInit {

  constructor(private stringService: StringHelperService, private toastService: ToastService, private userService: UserService, private sessionService : SessionService, private profileUpdate: ProfileupdateService) { }


  ngOnInit(): void {

  }

  setPassword(){

  }

  repass(currentPass: HTMLInputElement, newpass: HTMLInputElement, repass: HTMLInputElement){
    if (newpass.value === repass.value) {
      this.userService.SetPassword_Get(this.sessionService.getSessionValue(), currentPass.value, newpass.value)
        .subscribe( res => {
          let result = <{message: string}>res;
          this.toastService.writeMessage('success', "Şifren başarıyla güncellendi.", 4);
          currentPass.value="";
          newpass.value="";
          repass.value="";
        }, err => {
          if (this.stringService.Contains(err.error.error,"0063")) {
            this.toastService.writeMessage('warning', "Girmiş olduğun mevcut şifre yanlış !!", 4);
          }
        });
    }
    else{
      this.toastService.writeMessage('danger', "Şifreler uyuşmuyor !!", 4);
    }
  }

}

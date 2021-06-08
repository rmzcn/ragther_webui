import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetailModel } from '../services/BackendServices/API_Models/Get/profile_detail.model';
import { ProfileupdateService } from '../services/BackendServices/profileupdate.service';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'settings-panel-security',
  templateUrl: './settings-panel-security.component.html',
  styleUrls: ['./settings-panel-security.component.css']
})
export class SettingsPanelSecurityComponent implements OnInit {

  constructor(private stringService: StringHelperService, private toastService: ToastService, private userService: UserService, private sessionService : SessionService, private profileUpdate: ProfileupdateService) { }

  public userHiddenDesc: string;
  public isHiddenProfile: boolean;
  public userData = new Subject<UserDetailModel>();

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.GetUserProfile_Get(this.sessionService.getSessionValue(), this.sessionService.getSessionValue())
      .subscribe( res => {
        this.userData.subscribe( res =>{
          this.isHiddenProfile = res.profileDetail.isHiddenProfile;
          if (!res.profileDetail.isHiddenProfile) {
            res.profileDetail.isHiddenProfile = null;
          }
          this.userHiddenDesc = res.profileDetail.hiddenProfileDescription;
        });
        this.userData.next(<UserDetailModel>res);
      }, err => {
        console.log(err);
      });
  }

  update(isHiddenInput: HTMLInputElement, description : HTMLInputElement){
    if (this.userHiddenDesc !== description.value) {
      this.profileUpdate.UpdateHiddenDescription_Get(this.sessionService.getSessionValue(), description.value)
        .subscribe( res => {
          this.toastService.writeMessage("success", "Bilgilerin güncellendi.", 4);
          this.getUserData();
        },err => {
          this.toastService.writeMessage("danger", "Bilgilerin güncellenemedi.", 4);
        });
    }
    this.profileUpdate.SetVisibility_Get(this.sessionService.getSessionValue(), !isHiddenInput.checked)
      .subscribe( res => {
        console.log(res);
        this.toastService.writeMessage("success", "Bilgilerin güncellendi.", 4);
        this.getUserData();
      },err => {
        this.toastService.writeMessage("danger", "Bilgilerin güncellenemedi.", 4);
        console.log(err);
      });
  }



}

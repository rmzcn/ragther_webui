import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { time } from 'node:console';
import { Subject } from 'rxjs';
import { UserDetailModel } from '../services/BackendServices/API_Models/Get/profile_detail.model';
import { backendAddress } from '../services/BackendServices/Config/apiurls';
import { MailupdateService } from '../services/BackendServices/mailupdate.service';
import { ProfileupdateService } from '../services/BackendServices/profileupdate.service';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'settings-panel-profile',
  templateUrl: './settings-panel-profile.component.html',
  styleUrls: ['./settings-panel-profile.component.css']
})
export class SettingsPanelProfileComponent implements OnInit {

  constructor(private stringService: StringHelperService, private toastService: ToastService, private mailUpdateService: MailupdateService, private userService: UserService, private sessionService : SessionService, private profileUpdate: ProfileupdateService) { }

  public userMailAddress: string;
  public userDescription: string;
  public userData = new Subject<UserDetailModel>();
  backendUrlBase = backendAddress;
  selectedFile : File;
  fileUploadProgress : boolean = false;



  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.GetUserProfile_Get(this.sessionService.getSessionValue(), this.sessionService.getSessionValue())
      .subscribe( res => {
        this.userData.subscribe( res =>{
          this.userMailAddress= res.email;
          this.userDescription = res.profileDetail.profileDescription;
        });
        this.userData.next(<UserDetailModel>res);
      }, err => {
        console.log(err);
      });
  }

  updateMail(mail: HTMLInputElement){
    if (mail.value !== this.userMailAddress) {
      this.mailUpdateService.SendRequest_Get(this.sessionService.getSessionValue(), mail.value)
        .subscribe( res => {
          console.log(res);
          let result = <{message:string}>res;
          if (this.stringService.Contains(result.message, "0056")) {
            this.toastService.writeMessage("success","Mevcut mail adresine güncelleme bağlantısını gönderdik", 5);
          }
        }, err =>{
          if (this.stringService.Contains(err.error.error,"0058")) {
            this.toastService.writeMessage("danger","Zaten mevut süres dolmamış bir mail güncelleme talebin mevcut. Bir güncelleme işlemini tamamlaman halinde diğerine izin verilir!!", 8);
          }
        });
    }
  }

  updateDescription(description: HTMLInputElement){
    if (description.value !== this.userDescription) {
      this.profileUpdate.UpdateProfileDescription_Get(this.sessionService.getSessionValue(), description.value)
        .subscribe( res => {
          this.toastService.writeMessage("success","Profil açıklaman güncellendi", 3);
        }, err =>{
          console.log(err);
          this.toastService.writeMessage("danger","Profil açıklaman güncellenemedi", 3);
        });
    }
  }

  onFileChanged(event){
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  updateProfilePhoto(){
    if (this.selectedFile !== undefined) {
      this.profileUpdate.UploadProfileImage_Post(this.sessionService.getSessionValue(), this.selectedFile)
      .subscribe( event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = true;
        }
        else if(event.type === HttpEventType.Response){
          this.toastService.writeMessage("success", "Profil resmi güncellendi...", 3);
          this.getUserData();
          this.fileUploadProgress = false;
        }
      });
    }
  }

  update(mail, description){
    this.updateMail(mail);
    this.updateDescription(description);
    this.updateProfilePhoto();
  }

}

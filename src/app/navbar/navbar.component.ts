import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DarkMode } from '../dark-mode';
import { NoticeService } from '../services/BackendServices/notice.service';
import { SignalRService } from '../services/BackendServices/signal-r.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isEnabledDarkMode: boolean;
  darkModeRef: DarkMode = new DarkMode();
  userProfile : string = "";

  public unreadNoticeCount : number = 0;

  constructor(private toastService: ToastService, private sessionService : SessionService, private noticeService: NoticeService, private stringHelper: StringHelperService) {
    this.isEnabledDarkMode = this.darkModeRef.isEnabled();
  }

  noticeCountData: number = 0;

  ngOnInit(): void {
    setInterval( () => {
        this.getNoticeCount()
    }, 1000)

    this.userProfile = this.sessionService.getSessionValue();
  }

  darkMode(){
    if (this.isEnabledDarkMode) {
      this.darkModeRef.disable();
      this.isEnabledDarkMode = false;
      this.toastService.writeMessage('notification',"Karanlık Mod Kapatıldı ",3);
    }
    else{
      this.darkModeRef.enable();
      this.isEnabledDarkMode = true;
      this.toastService.writeMessage('notification',"Karanlık Mod Aktif ",3);
    }
  }

  getNoticeCount(){
    if (!this.stringHelper.isStringNullOrEmpty(this.sessionService.getSessionValue())) {

      this.noticeService.UnreadNoticeCount_Get(this.sessionService.getSessionValue())
        .subscribe( response =>{
          let res = <{unreadNoticeCount: string}>response;
          if (this.noticeCountData < Number.parseInt(res.unreadNoticeCount)) {
            this.toastService.writeMessage('notification', "1 Yeni Bildirim ❤️", 4);
          }
          this.noticeCountData = Number.parseInt(res.unreadNoticeCount);

        }, error => {
          console.log(error);
        });
    }
  }


}

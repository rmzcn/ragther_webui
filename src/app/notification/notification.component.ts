import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticesGet } from '../services/BackendServices/API_Models/Get/notices-model';
import { FirendshipService } from '../services/BackendServices/firendship.service';
import { NoticeService } from '../services/BackendServices/notice.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

class FriendshipRequests {
  conditionId : number;

}

class FriendshipConditions {
  const
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private toastService:ToastService, private sessionService: SessionService, private stringHelper: StringHelperService, private modalService: NgbModal, private noticeService: NoticeService, private friendshipService: FirendshipService) { }

  notices : NoticesGet[] = [];
  loadProgress : boolean = false;



  ngOnInit(): void {
    this.initNotices()
    this.loadProgress = true;
    this.getNoticesFromDb();
  }

  initNotices(){
    this.notices.push({
      createdAt: new Date(),
      relevantUserName : "",
      isRead : false,
      relevantURL : "",
      noticeId : 0,
      noticeTypeId: 0,
      ownerUserName: ""
    });
  }

  getNoticesFromDb(){
    this.noticeService.GetAll_Get(this.sessionService.getSessionValue())
      .subscribe( res => {
        this.notices = <NoticesGet[]>res;
        this.loadProgress = false;
        this.readAllNotices();
      }, err => {
        console.log(err);
        this.loadProgress = false;
      } );
  }

  readAllNotices(){
    if (this.notices.length === 0) {
      return;
    }
    this.noticeService.ReadAll_Get(this.sessionService.getSessionValue())
      .subscribe( res => {
        this.toastService.writeMessage('info'," 👌 Tüm bildirimler okundu olarak işaretlendi.", 3);
      }, err => {
        console.log(err);
      });
  }

  deleteAllNotices(){
    this.noticeService.DeleteAll_Get(this.sessionService.getSessionValue())
    .subscribe( res => {
      this.notices = [];
      // this.initNotices();
      this.toastService.writeMessage('success'," 👌 Tüm bildirimler silindi.", 3);
    }, err => {
      this.toastService.writeMessage('danger'," Bildirimler silinemedi!", 3);
    });
  }

  confirmModalForDeleteAll(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'md', centered: true}).result.then((result) => {
      if (result==='yes') {
        this.deleteAllNotices();
      }
      else if ('no') {
        this.toastService.writeMessage('info',"İşlem iptal edildi.", 3);
      }
    }, (reason) => {
      this.toastService.writeMessage('info',"İşlem iptal edildi.", 3);
    });
  }


}

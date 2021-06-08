import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FriendshipStatus } from '../Relations/friendship_status';
import { ChatModelGet } from '../services/BackendServices/API_Models/Get/chats.model';
import { UserInfoModelInner } from '../services/BackendServices/API_Models/Get/todo_get.model';
import { ChatService } from '../services/BackendServices/chat.service';
import { backendAddress } from '../services/BackendServices/Config/apiurls';
import { FirendshipService } from '../services/BackendServices/firendship.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'messaging-chats',
  templateUrl: './messaging-chats.component.html',
  styleUrls: ['./messaging-chats.component.css']
})
export class MessagingChatsComponent implements OnInit {

  constructor(private chatService: ChatService, private stringService: StringHelperService, private sessionService: SessionService, private toastService: ToastService, private friendshipService: FirendshipService, private router : Router) { }

  chats = new Subject<ChatModelGet[]>();
  friends = new Subject<UserInfoModelInner[]>();
  friendsList : UserInfoModelInner[] = [];
  backendUrlBase = backendAddress;

  ngOnInit(): void {
    this.getChats();
  }

  getChats(){
    this.chatService.GetChats(this.sessionService.getSessionValue())
      .subscribe( res => {
        this.chats.next(<ChatModelGet[]>res);
        console.log(<ChatModelGet[]>res);
      }, err => {
        this.toastService.writeMessage("danger", "Bir hata oluştu", 4);
      });
  }

  createChat(userName: string){
    this.chatService.CreateChat_Get(this.sessionService.getSessionValue(), userName)
      .subscribe( res => {
        this.toastService.writeMessage("notification","Sohbet oluşturuldu..", 3);
        this.getChats();
      }, err =>{
        this.toastService.writeMessage("notification","Sohbet oluşturulamadı..", 3);
      });
  }

  getFriends(){
    this.friendshipService.GetFriends_Get(this.sessionService.getSessionValue())
      .subscribe( res => {

        this.friendsList = <UserInfoModelInner[]>res;
        this.friends.next(<UserInfoModelInner[]>res);

      }, err =>{
        this.toastService.writeMessage("danger", "Arkadaşlar yüklenemedi.", 3);
      });
  }



  logOut(){
    this.sessionService.deleteSession();
    console.log(this.sessionService.getSessionValue());
    this.toastService.writeMessage("notification", "Başarıyla çıkış yaptınız Görüşmek üzere 👋👋", 4);
    this.router.navigate(['/login']);
    window.location.assign("http://localhost:4200/login")

  }

}

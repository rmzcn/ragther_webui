import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FriendshipStatus } from '../Relations/friendship_status';
import { UserDetailModel } from '../services/BackendServices/API_Models/Get/profile_detail.model';
import { angularAddress, backendAddress } from '../services/BackendServices/Config/apiurls';
import { FirendshipService } from '../services/BackendServices/firendship.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css','./profile.css', './badges.css']
})
export class ProfileHeaderComponent implements OnInit {

  isSendFriendship: boolean = false;

  isExistWaitingFriendshipRequest = false;

  isFriend : boolean = false;
  userName: string = "rmzncn";
  personName: string = "Ramazan Can";
  personSurname: string = "Gölgen";
  profileDescription: string = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium commodi corrupti exercitationem sunt beatae blanditiis vitae, illo ex reiciendis ipsa! Architecto illo, sapiente dolorem iure debitis aspernatur eum aperiam. Consequatur!";
  friendsNumber: number = 32;
  profileScore: number = 650;
  helpNumber: number = 14;

  backendUrlBase = backendAddress;
  angularUrlBase = angularAddress;

  sessionOwner = this.sessionService.getSessionValue();

  @Input() userDetail :UserDetailModel;

  constructor(private sessionService: SessionService, private friendshipService: FirendshipService, private route: ActivatedRoute, private toast: ToastService) { }

  ngOnInit(): void {
    this.getFriendship()
    // this.sessionService.deleteSession();
  }

  getFriendship(){
    this.friendshipService.GetFriendshipStatus_Get(this.sessionOwner, this.getUserName())
      .subscribe( res => {
        let result = <{message:string}>res;
        if (result.message === FriendshipStatus.friends) {
          this.isFriend = true;
        }
        if (result.message === FriendshipStatus.recipient_RequestWaiting) {
          this.isExistWaitingFriendshipRequest = true;
        }
        if (result.message === FriendshipStatus.sender_RequestWaiting) {
          this.isSendFriendship = true;
        }
        if (result.message === FriendshipStatus.notFriends) {
          this.isFriend = false;
        }

        console.log(res);

      }, err => {

      });
  }

  acceptRequest(){
    this.friendshipService.AcceptFriendship_Get(this.sessionOwner, this.userDetail.userName)
      .subscribe( res => {
        console.log(res);
        this.toast.writeMessage('emoji', "🔥🔥 Artık arkadaşsınız.. 🔥🔥" ,3);
        this.getFriendship();
      }, err => {
        console.log(err);
        this.toast.writeMessage('danger', "Bir hata oldu." ,3);
      });
  }

  sendFriendshipRequest(){
    this.friendshipService.SendRequest_Get(this.sessionOwner, this.userDetail.userName)
      .subscribe( res => {
        console.log(res);
        this.toast.writeMessage('emoji', "🔥🔥 Arkadaşlık isteği gönderildi... 🔥🔥" ,3);
        this.getFriendship();
      }, err => {
        console.log(err);
        this.toast.writeMessage('danger', "Arkadaşlık isteği gnderilemedi." ,3);
      });
  }

  rejectRequest(){
    this.friendshipService.RejectRequest_Get(this.sessionOwner, this.userDetail.userName)
      .subscribe( res => {
        console.log(res);
        this.toast.writeMessage('emoji', "😢😢 Arkadaşlık isteği reddedildi.. 😢😢" ,3);
        this.getFriendship();
      }, err => {
        console.log(err);
        this.toast.writeMessage('danger', "Bir hata oldu." ,3);
      });
  }

  revokeFriend(){
    this.friendshipService.RevokeFriendship_Get(this.sessionOwner, this.userDetail.userName)
      .subscribe( res => {
        console.log(res);
        this.toast.writeMessage('emoji', `${this.userDetail.firstName} arkadaşlıktan çıkartıldı.. 😢😢` ,5);
        this.getFriendship();
      }, err => {
        console.log(err);
        this.toast.writeMessage('danger', "Bir hata oldu." ,3);
      });
  }

  public getUserName() : string {
    return this.route.snapshot.paramMap.get("userID");
  }



}

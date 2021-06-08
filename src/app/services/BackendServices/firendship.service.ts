import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class FirendshipService {

  constructor(private httpClient: HttpClient) { }

  SendRequest_Get(senderUserName:string, recipientUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.SendRequest_Get(senderUserName,recipientUserName));
  }

  RejectRequest_Get(rejecterUserName:string, senderUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.RejectRequest_Get(rejecterUserName,senderUserName));
  }

  RevokeFriendship_Get(revokerUserName:string, recipientUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.RevokeFriendship_Get(revokerUserName,recipientUserName));
  }

  AcceptFriendship_Get(accepterUserName:string, senderUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.AcceptFriendship_Get(accepterUserName,senderUserName));
  }

  GetFriendshipStatus_Get(requesterUserName:string, targetUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.GetFriendshipStatus_Get(requesterUserName,targetUserName));
  }

  GetFriends_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.friendshipApiUrls.GetFriends_Get(requesterUserName));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  SendMessage_Get(senderUserName: string, chatId: number, content: string){
    return this.httpClient.get(apiurls.messageApiUrls.SendMessage_Get(senderUserName,chatId,content));
  }

  GetUnreadMessages_Get(chatId: number, requesterUserName: string){
    return this.httpClient.get(apiurls.messageApiUrls.GetUnreadMessages_Get(chatId,requesterUserName));
  }

  GetMessages_Get(chatId: number, requesterUserName: string){
    return this.httpClient.get(apiurls.messageApiUrls.GetMessages_Get(chatId,requesterUserName));
  }
}

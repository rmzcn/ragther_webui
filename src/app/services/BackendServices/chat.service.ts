import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  CreateChat_Get(requesterUserName: string, secondUserName: string){
    return this.httpClient.get(apiurls.chatApiUrls.CreateChat_Get(requesterUserName,secondUserName));
  }

  GetChats(requesterUserName: string){
    return this.httpClient.get(apiurls.chatApiUrls.GetChats(requesterUserName));
  }

  GetChatHead(requesterUserName:string, chatId:number){
    return this.httpClient.get(apiurls.chatApiUrls.GetChatHead(requesterUserName,chatId));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpClient: HttpClient) { }

  DeleteAll_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.noticeApiUrls.DeleteAll_Get(requesterUserName));
  }

  GetAll_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.noticeApiUrls.GetAll_Get(requesterUserName));
  }

  ReadAll_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.noticeApiUrls.ReadAll_Get(requesterUserName));
  }

  UnreadNoticeCount_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.noticeApiUrls.UnreadCount(requesterUserName));
  }
}
